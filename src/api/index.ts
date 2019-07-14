import { AudioLabelingProject } from '../types';
import annotations from './fixture.json';

export const getProject = async (id: string): Promise<AudioLabelingProject> => {
  return {
    id: '0',
    audioFileURI: './data/recording.wav',
    annotations: annotations,
  };
};
