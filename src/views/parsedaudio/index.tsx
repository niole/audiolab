import React, { useState } from 'react';

import { getProject } from 'api';
import withDataGetter from 'containers/withDataGetter';
import { AudioLabelingProject } from 'types';
import AudioPlayer from 'views/audioplayer';
import AudioTrack from 'views/parsedaudio/AudioTrack';

/**
 * need
 * different speakers
 * colors for each speaker
 * location for each speaker
 * render each audio bite in order
 */
const ParsedAudio = ({ audioFileURI, annotations }: InnerProps) => {
    const [offsetMillis, setOffsetMillis] = useState(0);
    return (
        <>
            <AudioPlayer
                audioFileURI={audioFileURI}
                setOffsetMillis={setOffsetMillis}
            />
            {offsetMillis}
            <AudioTrack offsetMillis={offsetMillis} speakerAnnotations={annotations} />
        </>
    );
};

type OuterProps = {};
type InnerProps = AudioLabelingProject;
export default withDataGetter<OuterProps, InnerProps>(
    id => getProject('o')
)(ParsedAudio);
