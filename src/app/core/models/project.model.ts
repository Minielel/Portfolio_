export type ProjectStatus = 'live' | 'progress' | 'archived';
export type ImageOrientation = 'landscape' | 'portrait';

export interface ProjectImage {
  /** Pfad zum Bild, z.B. 'assets/projects/portfolio/hero.jpg' */
  src: string;
  orientation: ImageOrientation;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  /** Kurzer Text, der immer auf der Karte steht. */
  description: string;
  /** Optionaler Langtext, der über den "Mehr erfahren"-Button aufgeklappt wird. */
  longDescription?: string;
  githubUrl?: string;
  docsUrl?: string;
  techStack: string[];
  images: ProjectImage[];
}
