import * as React from 'react';

import { getProject } from 'api';
import withDataGetter from 'containers/withDataGetter';
import { Annotation, AudioLabelingProject } from 'types';
import AudioPlayer from 'views/audioplayer';

const ParsedAudio = ({ annotations, audioFileURI }: InnerProps) => (
    <div>
        <AudioPlayer
            audioFileURI={audioFileURI}
        />
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
