export interface SkillGroup {
  category: string;
  skills: string[];
}

/**
 * Wie bei den Projekten: hier einfach Kategorien/Skills eintragen,
 * die Seite baut sich automatisch daraus zusammen.
 */
export const SKILLS: SkillGroup[] = [
  {
    category: 'Programmierung',
    skills: [
      'C',
      'Python',
      'C#',
      'JavaScript',
      'PL/SQL',
    ]
  },
  {
    category: 'CAD & 3D',
    skills: [
      'CAD',
      '3D-Konstruktion',
      '3D-Modellierung',
      '3D-Druck'
    ]
  },
  {
    category: 'KI & Software',
    skills: [
      'KI-gestützte Entwicklung',
      'LLMs',
      'AI Agents',
      'Webentwicklung',
      'API-Integration'
    ]
  },
  {
    category: 'Systeme & Infrastruktur',
    skills: [
      'Linux',
      'Docker',
      'Proxmox',
      'Server',
    ]
  },
  {
    category: 'Elektronik & Embedded',
    skills: [
      'Mikrocontroller',
      'ESP32',
      'Sensorik',
      'Elektronik'
    ]
  },
  {
    category: 'Interessen',
    skills: [
      'Robotik',
      'Mechatronik',
      'Automatisierung',
      'Drohnen',
      'Computer Vision'
    ]
  }
];
