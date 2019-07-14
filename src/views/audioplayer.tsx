import * as React from 'react';

import ReactPlayer from 'react-player';

type Props = {
  audioFileURI: string;
  setOffsetMillis: (n:number) => void;
};
const AudioPlayer: React.SFC<Props> = ({
  audioFileURI,
  setOffsetMillis,
}) => {
  const onProgress = ({ playedSeconds }: { playedSeconds: number }) =>
    setOffsetMillis(playedSeconds);
  return (
    <ReactPlayer
      url={audioFileURI}
      controls
      height={50}
      onProgress={onProgress}
    />
  );
};

export default AudioPlayer;
