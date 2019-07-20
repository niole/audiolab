import * as React from 'react';

import ReactPlayer from 'react-player';

const UPDATE_INTERVAL = 1000/60;

const defaultStyle = { display: 'none' };

const onProgress = (setOffsetMillis: Props['setOffsetMillis']) => ({ playedSeconds }: { playedSeconds: number }) =>
  setOffsetMillis(playedSeconds * 1e3);

type Props = {
  audioFileURI: string;
  setOffsetMillis: (n: number) => void;
  offsetMillis?: number;
  isPlaying?: boolean;
};
const AudioPlayer: React.SFC<Props> = ({
  offsetMillis,
  audioFileURI,
  setOffsetMillis,
  isPlaying,
}) => {
  const ref: React.RefObject<ReactPlayer> = React.createRef();
  React.useEffect(() => {
    const player = ref.current;
    if (player && offsetMillis !== undefined) {
      player.seekTo(offsetMillis / 1000);
    }
  }, [offsetMillis, !!ref.current]);
  return (
    <ReactPlayer
      style={defaultStyle}
      playing={isPlaying}
      ref={ref}
      width="100%"
      progressInterval={UPDATE_INTERVAL}
      url={audioFileURI}
      controls
      height={50}
      onProgress={onProgress(setOffsetMillis)}
    />
  );
};

export default AudioPlayer;
