import * as React from 'react';
import { Annotation } from '../../types';

const vis = require('vis');
console.log(vis);

type Props = {
    speakerAnnotations: Annotation[];
    speakerId: number;
};

const AudioTrack = ({ speakerId, speakerAnnotations }: Props) => (
    <div>
        <h1>
            speaker {speakerId}
        </h1>
        {speakerAnnotations.map(({
            text,
            durationMillis,
            startOffsetMillis,
            speakerId,
        }: Annotation) => (
            <div>
                {text}
            </div>
        ))}
    </div>
);

export default AudioTrack;
