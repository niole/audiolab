import * as React from 'react';
import { groupBy } from 'ramda';
import { Annotation } from '../../types';
const vis = require('vis');

const colors = ['red', 'blue', 'yellow'];
const getColor = (index: number): string => {
    return colors[index];
};

type Props = {
    startTime: number;
    offsetMillis: number;
    speakerAnnotations: Annotation[];
};

let timeline: any = null;

const AudioTrack = ({
    offsetMillis,
    speakerAnnotations,
    startTime,
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
                    id: a.startMillis,
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
                start: startTime,
            };
            // Create a Timeline
            if (!timeline) {
                timeline = new vis.Timeline(container, items, groups, options);
                timeline.addCustomTime(startTime);
            }

            return () => {
                timeline.destroy();
                timeline = null;
            };
        }

    }, [!!timelineRef.current, speakerAnnotations, startTime]);
    return (
        <div ref={timelineRef} />
    );
};

export default AudioTrack;
