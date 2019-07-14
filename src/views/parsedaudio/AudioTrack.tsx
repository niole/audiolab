import * as React from 'react';
import { groupBy } from 'ramda';
import { Annotation } from '../../types';
const vis = require('vis');

const colors = ['red', 'blue', 'yellow'];
const getColor = (index: number): string => {
    return colors[index];
};

type Props = {
    offsetMillis: number;
    speakerAnnotations: Annotation[];
};

let timeline: any = null;

const AudioTrack = ({ offsetMillis, speakerAnnotations }: Props) => {
    const timelineRef: React.RefObject<HTMLDivElement> = React.createRef();

    const startOffset = Math.min(...speakerAnnotations.map(x => x.startOffsetMillis));

    React.useEffect(() => {
        timeline && (timeline as any).setCustomTime(startOffset + offsetMillis);
    }, [offsetMillis]);

    React.useEffect(() => {
        const container = timelineRef.current;
        if (container) {
            // mount timeline
            var items = new vis.DataSet(
                speakerAnnotations.map((a: Annotation) => ({
                    id: a.startOffsetMillis,
                    group: a.speakerId,
                    content: `${a.speakerId} ${a.text}`,
                    start: a.startOffsetMillis,
                    end: a.startOffsetMillis + a.durationMillis*1e-2,
                    style: `background:${getColor(a.speakerId)}`
                }))
            );
            const groups = Object.keys(groupBy(x => x.speakerId.toString(), speakerAnnotations))
                .map((x: string, index: number) => ({ id: x }));
            const options = {
            };
            // Create a Timeline
            if (!timeline) {
                timeline = new vis.Timeline(container, items, groups, options);
                timeline.addCustomTime(0);
            }

            return () => {
                timeline.destroy();
                timeline = null;
            };
        }

    }, [!!timelineRef.current, speakerAnnotations]);
    return (
        <div ref={timelineRef} />
    );
};

export default AudioTrack;
