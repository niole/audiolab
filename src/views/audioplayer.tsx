import * as React from 'react';

import ReactPlayer from 'react-player';

type Props = {
  audioFileURI: string;
};
const AudioPlayer: React.SFC<Props> = ({
  audioFileURI,
}) => {
  return (
    <ReactPlayer
      url={audioFileURI}
      controls
      height={50}
    />
  );
};

export default AudioPlayer;
