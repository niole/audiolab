import React, { useState } from 'react';

import { getProject } from 'api';
import withDataGetter from 'containers/withDataGetter';
import { AudioLabelingProject } from 'types';
import AudioPlayer from 'views/AudioPlayer';
import AudioTrack from 'views/parsedaudio/AudioTrack';

const ParsedAudio = ({ startTime, audioFileURI, annotations }: InnerProps) => {
    const [offsetMillis, setOffsetMillis] = useState(0);
    return (
        <>
            <AudioPlayer
                audioFileURI={audioFileURI}
                setOffsetMillis={setOffsetMillis}
            />
            <AudioTrack
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
