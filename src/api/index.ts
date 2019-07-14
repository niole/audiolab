import { AudioLabelingProject } from 'types';
import annotations from './fixture.json';

export const getProject = async (id: string): Promise<AudioLabelingProject> => {
  return {
    id: '0',
    audioFileURI: './data/recording.wav',
    startTime: Date.parse('July 12 2019 18:01:57 utc-4') + 5.8e3,
    annotations: annotations.logRecords.map((x:any) => ({
      ...x,
      text: x.text,
      speakerId: x.isResponse ? 0 : 1,
      startMillis: Date.parse(x.serverTimestamp) - (
        // hack because response starttimes are true starttimes
        // while sent messages are posted to chat after STT
        // and hence are really the endTime of the utterance in
        // the recording
        x.isResponse
          ? 0
          : x.duration.seconds * 1e3 / 2
      ),
      durationMillis: x.duration.seconds * 1e3,
    })),
  };
};
