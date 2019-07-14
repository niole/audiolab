import * as React from 'react';
import { getProject } from '../../api';
import withDataGetter from '../../containers/withDataGetter';
import { Annotation, AudioLabelingProject } from '../../types';

const ParsedAudio = ({ annotations }: InnerProps) => (
    <div>
        {annotations.map(({
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

type OuterProps = {};
type InnerProps = AudioLabelingProject;
export default withDataGetter<OuterProps, InnerProps>(
    id => getProject('o')
)(ParsedAudio);
