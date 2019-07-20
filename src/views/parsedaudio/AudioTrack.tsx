import * as React from 'react';
import styled from 'styled-components';
import { groupBy } from 'ramda';
import { Annotation } from '../../types';
const vis = require('vis');

const Timeline = styled.div`
    .vis-time-axis.vis-foreground {
        > div:last-of-type {
            display: none;
        }
    }
`;

const colors = ['red', 'blue', 'yellow'];
const getColor = (index: number): string => {
    return colors[index];
};

type Props = {
    startTime: number;
    offsetMillis: number;
    speakerAnnotations: Annotation[];
    onAnnotationAdjust?: (newAnnotation: Annotation) => Promise<void>;
    seek?: (newOffsetMillis: number) => void;
    togglePlaying: () => void;
};

// TODO BAD!!!
let timeline: any = null;

const AudioTrack = ({
    offsetMillis,
    speakerAnnotations,
    startTime,
    onAnnotationAdjust,
    seek,
    togglePlaying,
}: Props) => {
    const timelineRef: React.RefObject<HTMLDivElement> = React.createRef();

    React.useEffect(() => {
        timeline && (timeline as any).setCustomTime(offsetMillis + startTime);
    }, [offsetMillis]);

    React.useEffect(() => {
        const container = timelineRef.current;
        if (container) {
            // mount timeline
            var items = new vis.DataSet(
                speakerAnnotations.map((a: Annotation) => ({
                    id: a.startMillis, // TODO would be better if this had a unique id that isn't changeable data
                    group: a.speakerId,
                    content: `${a.speakerId} ${a.text}`,
                    start: a.startMillis,
                    end: a.startMillis + a.durationMillis,
                    style: `background:${getColor(a.speakerId)}`
                }))
            );
            const groups = Object.keys(groupBy(x => x.speakerId.toString(), speakerAnnotations))
                .map((x: string, index: number) => ({ id: x }));
            const options = {
                editable: {
                    add: false,
                    updateTime: true,
                },
                selectable: true,
                start: startTime,
                multiselect: true,
                onMove: (item: any, adjustDoneCallback: (item: any) => void) => {
                    if (onAnnotationAdjust) {
                        const groupId = parseFloat(item.group);
                        const itemToUpdate = speakerAnnotations.find(
                            (a: Annotation) => a.speakerId === groupId && item.id === a.startMillis
                        );
                        if (itemToUpdate) {
                            const newStart = new Date(item.start).getTime();
                            const newEnd = new Date(item.end).getTime();
                            const durationMillis = newEnd - newStart;
                            onAnnotationAdjust({
                                ...itemToUpdate,
                                startMillis: newStart,
                                durationMillis,
                            })
                            .then(() => {
                                adjustDoneCallback(item);
                            })
                            .catch((error: any) => {
                                console.error(`Failed to adjust item with id: ${item.id}, error: ${error}`);
                            });
                        } else {
                            console.warn(`Couldn't find annotation for item ${JSON.stringify(item)}`);
                        }
                    } else {
                        adjustDoneCallback(item);
                    }
                }
            };
            // Create a Timeline
            if (!timeline) {
                timeline = new vis.Timeline(container, items, groups, options);
                timeline.addCustomTime(startTime);
                timeline.on('timechanged', (event: any) => {
                    if (seek) {
                        const newTimeAsDate = new Date(event.time).getTime();
                        seek(newTimeAsDate - startTime);
                    }
                });
            }

            return () => {
                timeline.destroy();
                timeline = null;
            };
        }

    }, [!!timelineRef.current, speakerAnnotations, startTime]);
    return (
        <div>
            <Timeline onDoubleClick={togglePlaying} ref={timelineRef} />
            <div>
                <p>double click to play/pause</p>
                <p>drag vertical bar to seek</p>
                <p>select annotations to drag and resize them</p>
            </div>
        </div>
    );
};

export default AudioTrack;
