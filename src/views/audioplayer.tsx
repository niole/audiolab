import * as React from 'react';

import ReactPlayer from 'react-player';

const UPDATE_INTERVAL = 1000/60;

type Props = {
  audioFileURI: string;
  setOffsetMillis: (n:number) => void;
};
const AudioPlayer: React.SFC<Props> = ({
  audioFileURI,
  setOffsetMillis,
}) => {
  const onProgress = ({ playedSeconds }: { playedSeconds: number }) =>
    setOffsetMillis(playedSeconds * 1e3);
  return (
    <ReactPlayer
      width="100%"
      progressInterval={UPDATE_INTERVAL}
      url={audioFileURI}
      controls
      height={50}
      onProgress={onProgress}
    />
  );
};

export default AudioPlayer;
