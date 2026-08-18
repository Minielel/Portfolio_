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
      
    ]
  },

  {
  id: 'auter',
  title: 'AUTER – Automatisches Terrarium',
  status: 'progress', // Prototyp/Elektronik noch nicht final (Korrosionsproblem), Software läuft im Alltag
  description: 'Automatisiertes Terrarium auf ESP32-Basis: sensorgesteuerte Bewässerung mit Erfolgsprüfung, zeitgesteuerte Beleuchtung, Web-Dashboard und Telegram-Anbindung. MQTT-Integration für Smarthome-Einbindung ist als nächster Schritt geplant.',
  githubUrl: 'https://github.com/DEIN-USERNAME/AUTER', // TODO: echten Link eintragen
  docsUrl: '/projects/auter/docs', // optional – nur setzen, wenn du die docs/ separat auf der Seite rendern willst
  techStack: ['ESP32', 'C++', 'Arduino Framework', 'Telegram Bot API'],
  images: [
    
  ]
}
];
