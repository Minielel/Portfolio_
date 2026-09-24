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
      'Meine eigene Portfolio-Seite, entwickelt als digitale Visitenkarte und Ort für meine Projekte.',
    longDescription:
      'Das Angular-Frontend folgt einer MVVM-Struktur und enthält im Hero-Bereich eine interaktive Three.js-Ameisenkolonie-Simulation. Die Seite wird über GitHub Actions automatisch nach AWS S3 ausgeliefert und über CloudFront bereitgestellt.',
    githubUrl: 'https://github.com/Minielel/portfolio',
    techStack: ['Angular', 'TypeScript', 'Three.js', 'AWS S3', 'CloudFront'],
    images: []
  },

  {
    id: 'sensor-modul-gehaeuse',
    title: 'Gehäuse-Konstruktion für Sensor-Modul',
    status: 'progress',
    description:
      'Konstruktion eines kompakten Gehäuses für ein Sensormodul mit Fokus auf Funktion, Platzierung und Fertigbarkeit.',
    longDescription:
      'Das Bauteil wurde mit den Anforderungen eines realen Einsatzszenarios entwickelt: leicht zugängliche Anschlüsse, einfache Montage und robuste Abmessungen für den 3D-Druck. Dabei wurden Passungen, Materialwahl und Fertigungslogik berücksichtigt, damit das Design praktisch umsetzbar und wiederverwendbar bleibt.',
    techStack: ['Fusion 360', '3D-Druck (PLA/PETG)', 'Toleranzanalysen', 'CAD-Design'],
    images: []
  },

  {
    id: 'server-backend-infrastruktur',
    title: 'Server, Networking & Backend',
    status: 'progress',
    description:
      'Selbstständige Arbeit mit Server-Hardware, Linux-Umgebungen und Backend-Architekturen für digitale Anwendungen.',
    longDescription:
      'In diesem Bereich liegt mein Fokus auf der Strukturierung von Server-Setups, Netzwerk-Konfiguration, Docker-Umgebungen und API-Services. Ich interessiere mich dafür, wie einzelne Komponenten – Hostsysteme, Datenbanken, Reverse-Proxies und Anwendungsdienste – zusammenarbeiten und wie sich daraus robuste, skalierbare Systeme entwickeln lassen.',
    techStack: ['Linux', 'Docker', 'Nginx', 'Python', 'REST-API', 'GitHub', 'SSH'],
    images: []
  },

  {
    id: 'vectoai-praxisprojekt',
    title: 'VectoAI – Backend-Architektur & Praxisprojekt',
    status: 'progress',
    description:
      'Aktuelles Praxisprojekt mit Fokus auf Backend-Architektur, Server-Hosting, Datenverarbeitung und Schnittstellenentwicklung.',
    longDescription:
      'Bei VectoAI übernehme ich Verantwortung für die technische Basis, die Server- und Hosting-Struktur sowie die Verbindung zwischen Datenquellen und Anwendungslogik. Der Schwerpunkt liegt auf verständlichen APIs, sauberer Infrastruktur und einer Architektur, die für spätere Erweiterungen und reale Nutzung tragfähig bleibt.',
    techStack: ['Backend-Architektur', 'Server-Hosting', 'Datenverarbeitung', 'APIs', 'Teamarbeit'],
    images: []
  },

  {
    id: 'auter',
    title: 'AUTER – Automatisches Terrarium',
    status: 'progress',
    description: 'Automatisiertes Terrarium auf ESP32-Basis mit sensorgesteuerter Bewässerung und Beleuchtung.',
    longDescription: 'Die Bewässerung prüft ihren Erfolg über Sensorwerte. Zusätzlich gibt es ein Web-Dashboard und eine Telegram-Anbindung für Statusmeldungen. Als nächster Schritt ist eine MQTT-Integration für die Smarthome-Einbindung geplant.',
    githubUrl: 'https://github.com/DEIN-USERNAME/AUTER',
    techStack: ['ESP32', 'C++', 'Arduino Framework', 'Telegram Bot API'],
    images: []
  },

  {
  id: 'laufrad',
  title: 'Motorisiertes DIY-Laufrad',
  status: 'live',
  description:
    'Custom-Hardware-Projekt für das Macherfestival 2026. Ein Kinder-Laufrad kombiniert mit dem Motor, Akku und Display eines Xiaomi Scooter 4 Pro Gen 2, verlängert durch eine Stahlrahmen-Konstruktion und eigene 3D-Druck-Teile.',
  githubUrl: 'https://github.com/Minielel/Laufrad',

  techStack: [
    '3D Printing / CAD',
    'Mechanik',
    'Xiaomi Hardware'
  ],

  images: [
    {
      src: 'assets/projects/laufrad/Laufrad_Seite.jpeg',
      orientation: 'landscape',
      caption: 'Motorisiertes Laufrad – Gesamtansicht'
    },
    {
      src: 'assets/projects/laufrad/Laufrad_Forne.jpeg',
      orientation: 'landscape',
      caption: 'Frontansicht mit 3D-gedruckter Display-Halterung'
    },
    {
      src: 'assets/projects/laufrad/Laufrad_Hinten.jpeg',
      orientation: 'portrait',
      caption: 'Heckansicht mit Scooter-Motor'
    },
    {
      src: 'assets/projects/laufrad/Display_Halterung_1.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Display-Halterung (Ansicht 1)'
    },
    {
      src: 'assets/projects/laufrad/Display_Halterung_2.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Display-Halterung (Ansicht 2)'
    },
    {
      src: 'assets/projects/laufrad/Akku_Shell_1.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Akku-Schale (Teil 1)'
    },
    {
      src: 'assets/projects/laufrad/Akku_Shell_2.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Akku-Schale (Teil 2)'
    }
  ]
}
];
