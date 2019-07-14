import React, { useState } from 'react';
import { groupBy } from 'ramda';

import { getProject } from 'api';
import withDataGetter from 'containers/withDataGetter';
import { Annotation, AudioLabelingProject } from 'types';
import AudioPlayer from 'views/audioplayer';
import AudioTrack from 'views/parsedaudio/AudioTrack';

const sortByStartTime = (as: Annotation[]): Annotation[] => {
    return as.sort((a: Annotation, b: Annotation) => a.startOffsetMillis - b.startOffsetMillis);
};

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
            {Object.values(groupBy(a => a.speakerId.toString(), annotations)).map((as: Annotation[]) => (
                <AudioTrack speakerAnnotations={sortByStartTime(as)} speakerId={as[0].speakerId}/>
            ))}
        </>
    );
};

type OuterProps = {};
type InnerProps = AudioLabelingProject;
export default withDataGetter<OuterProps, InnerProps>(
    id => getProject('o')
)(ParsedAudio);
