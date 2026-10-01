export type WordCategory = 'native' | 'borrowed' | 'foreign' | 'english';

export interface SlideInfo {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
}

export interface DetectiveState {
  points: number;
  discoveredClues: string[];
  completedSlides: number[];
}
