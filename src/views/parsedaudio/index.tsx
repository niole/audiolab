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
    const [trackControlledOffsetMillis, setTrackOffsetMillis] = useState(0);
    const [offsetMillis, setOffsetMillis] = useState(0);
    const [isPlaying, setIsPlaying] = useState();
    return (
        <>
            <AudioPlayer
                offsetMillis={trackControlledOffsetMillis}
                audioFileURI={audioFileURI}
                setOffsetMillis={setOffsetMillis}
                isPlaying={isPlaying}
            />
            <AudioTrack
                togglePlaying={() => setIsPlaying(!isPlaying)}
                seek={setTrackOffsetMillis}
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
