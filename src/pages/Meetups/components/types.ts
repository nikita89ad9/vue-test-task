export interface IMeetupsRecProps {
  title?: string;
  description?: string;
  duration?: TimeFormat;
  participants?: number;
  createdAt?: Date;
  tags?: string[];
  logo?: string;
}

export interface INavPlaceholders {
  [key: string]: string;
}

type TimeFormat = `${string}:${string}:${string}`;
