import React, { useState } from 'react';

import { getProject } from 'api';
import withDataGetter from 'containers/withDataGetter';
import { Annotation, AudioLabelingProject } from 'types';
import AudioPlayer from 'views/AudioPlayer';
import AudioTrack from 'views/parsedaudio/AudioTrack';

const handleAnnotationAdjust = async (newAnnotation: Annotation) => {
    console.log(newAnnotation);
};

const ParsedAudio = ({ startTime, audioFileURI, annotations }: InnerProps) => {
    const [offsetMillis, setOffsetMillis] = useState(0);
    return (
        <>
            <AudioPlayer
                audioFileURI={audioFileURI}
                setOffsetMillis={setOffsetMillis}
            />
            <AudioTrack
                onAnnotationAdjust={handleAnnotationAdjust}
                startTime={startTime}
                offsetMillis={offsetMillis}
                speakerAnnotations={annotations}
            />
        </>
    );
};

type OuterProps = {};
type InnerProps = AudioLabelingProject;
export default withDataGetter<OuterProps, InnerProps>(
    id => getProject('o')
)(ParsedAudio);
