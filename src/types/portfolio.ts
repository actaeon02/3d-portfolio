export interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
  link?: string;
  video?: string; // URL to demo video (.mp4 or YouTube/Vimeo)
  gallery?: string[]; // Array of additional screenshots
  overview?: string; // Long-form case study narrative
  features?: string[]; // Key technical or design highlights
  themeColor?: string; // Hex color for the 3D scene shift
}
