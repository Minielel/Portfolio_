import { Project } from '../models/project.model';

/**
 * ============================================================
 * PROJEKT-DATEN
 * ============================================================
 * Neues Projekt hinzufügen -> neues Objekt in dieses Array einfügen.
 * Neues Bild hinzufügen    -> neues Objekt im "images"-Array des
 *                             jeweiligen Projekts einfügen.
 *
 * Bilder liegen unter public/assets/projects/<projekt-ordner>/...
 * "orientation" bestimmt, ob das Bild als 16:9 (landscape) oder
 * 3:4 (portrait) angezeigt wird - beide werden auf dieselbe Höhe
 * skaliert, das Seitenverhältnis bleibt dabei immer erhalten.
 * ============================================================
 */
export const PROJECTS: Project[] = [
  {
    id: 'portfolio-website',
    title: 'Portfolio-Website',
    status: 'live',
    description:
      'Meine eigene Portfolio-Seite. Angular Frontend mit MVVM-Struktur, interaktiver Three.js-Ameisenkolonie-Simulation im Hero-Bereich, automatischem AWS-Deployment über GitHub Actions.',
    githubUrl: 'https://github.com/Minielel/portfolio',
    techStack: ['Angular', 'TypeScript', 'Three.js', 'AWS S3', 'CloudFront'],
    images: [
      {
        src: 'assets/projects/portfolio-website/hero.svg',
        orientation: 'landscape',
        caption: 'Hero-Bereich mit der 3D-Ameisenkolonie-Simulation und dem Theme-Toggle.'
      },
      {
        src: 'assets/projects/portfolio-website/projects.svg',
        orientation: 'portrait',
        caption: 'Projekt-Übersicht mit Status-Badges pro Karte.'
      },
      {
        src: 'assets/projects/portfolio-website/dark-mode.svg',
        orientation: 'landscape',
        caption: 'Dark-Mode-Ansicht der About-Sektion.'
      }
    ]
  }
];
