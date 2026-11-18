// Portfolio values are maintained through /dashboard in data/content.json.
export interface Project {
  title: string;
  engine: string;
  description: string;
  image?: string;
  screenshots: string[];
  video?: string;
  highlights?: string[];
  cover?: {
    eyebrow: string;
    title: string;
    detail: string;
    accent: string;
  };
}
