export type AudioLabelingProject = {
  startTime: number;
  audioFileURI: string;
  id: string;
  annotations: Annotation[];
};

export type Annotation = {
  text: string;
  durationMillis: number;
  startMillis: number;
  speakerId: number;
}
