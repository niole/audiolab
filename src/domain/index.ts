export type AudioLabelingProject = {
  audioFileURI: string;
  annotations: Annotation[];
};

export type Annotation = {
  text: string;
  durationMillis: number;
  startOffsetMillis: number;
  speakerId: number;
}
