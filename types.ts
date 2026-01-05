export interface VideoDetails {
  id: string;
  url: string;
  thumbnailUrl: string;
  title?: string;
}

export interface AiInsights {
  summary: string;
  tags: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  suggestedFileName: string;
}

export interface DownloadOption {
  quality: string;
  format: 'mp4' | 'mp3';
  size: string;
  badge?: string;
}

export enum DownloadStatus {
  IDLE = 'IDLE',
  PREPARING = 'PREPARING',
  DOWNLOADING = 'DOWNLOADING',
  CONVERTING = 'CONVERTING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}