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
  id: 'linearschlitten',
  title: 'Linearschlitten – Meerwasser-Lab PoC',
  status: 'progress',
  description: 'Proof of Concept für ein automatisiertes Meerwasser-Labor. Ein aus Anycubic-3D-Druckerteilen gebauter Schlitten mit Taster-Umkehrlogik zur Positionierung von Dosierköpfen.',
  githubUrl: 'https://github.com/Minielel/Linearschlitten',
  techStack: [
    'C++',
    '3D Printing / CAD',
    'Hardware Hacking',
    'Automation'
  ],
  images: [
    {
      src: 'assets/projects/linearschlitten/Linearschlitten_Video.mp4',
      orientation: 'portrait',
      caption: 'Funktions-Demo: Linearschlitten mit Taster-Umkehr im Betrieb'
    },
    {
      src: 'assets/projects/linearschlitten/Linearschlitten_Teil.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Führungs-Schlitten'
    },
    {
      src: 'assets/projects/linearschlitten/Linearschlitten_Teil_Kopf.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Dosierkopf-Halterung'
    },
    {
      src: 'assets/projects/linearschlitten/Linearschlitten_Teil_Motor.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Motor- & Schrittmotor-Halterung'
    }
  ]
},

  {
  id: 'vecto-ai',
  title: 'VectoAI — Agentischer KI-Kundenservice',
  status: 'progress',
  description:
    'Gründungsprojekt & B2B-SaaS-Plattform. Ein KI-Agent, der Kundensupport-Anfragen nicht nur beantwortet, sondern Funktionen in Web-Software eigenständig ausführt – DSGVO-konform gehostet in Frankfurt.',
  longDescription:
    'Als CEO und Backend-Entwickler baue ich gemeinsam mit meinem Team VectoAI auf. Neben der technischen Architektur (Backend, Vektordatenbanken, LLM-Integrationen) liegt der Fokus auf den Prozessen einer bevorstehenden UG-Gründung, Marktpositionierung und Unternehmensführung. VectoAI lernt Softwareprodukte über automatisches Website-Scraping und führt Aktionen wie Formularausfüllungen, Navigation und Daten-Imports direkt im Auftrag der Endnutzer aus.',
  githubUrl: '',
  // Kannst du ergänzen, falls das Repo öffentlich oder privat verlinkt werden soll
  techStack: [
    'Backend Architecture',
    'Node.js / TypeScript',
    'Vector DB',
    'LLM / AI Agents',
    'SaaS / B2B',
    'DSGVO / Security'
  ],
  images: []
  // Keine Bilder vorhanden – die Projektkarte rendert somit reinen Text ohne Platzhalter
},

  {
  id: 'remote-pc',
  title: 'Self-Hosted Remote Gaming Server',
  status: 'live',
  description:
    'Eigenbau-Server aus PC-Hardware mit GPU-Passthrough (RTX 3060 Ti, i5-12400F). Ermöglicht latenzarmes High-End-Gaming von jedem Ort auf schwachen Client-Geräten über einen sicheren WireGuard-VPN-Tunnel.',
  githubUrl: 'https://github.com/Minielel/Remote_PC',
  techStack: [
    'Homelab / Server',
    'GPU Passthrough',
    'Virtualisierung',
    'WireGuard VPN',
    'Hardware'
  ],
  images: [
    {
      src: 'assets/projects/remote-pc/RemotePC_ProxmoxSummary.png',
      orientation: 'landscape',
      caption: 'Homelab Server & Virtualisierungs-Setup'
    },
    {
      src: 'assets/projects/remote-pc/RemotePC_ProxmoxHardware.png',
      orientation: 'landscape',
      caption: 'Hardware- & Remote-Konfiguration'
    },
    {
      src: 'assets/projects/remote-pc/Moonlight_Stream.png',
      orientation: 'landscape',
      caption: 'Client-Zugriff via WireGuard-Tunnel'
    }
  ]
},

  {
  id: 'auter',
  title: 'AUTER – Automatisches Terrarium',
  status: 'progress',
  description:
    'Smartes IoT-Terrarium mit C++ Steuerung, automatischem Drip-Bewässerungssystem und Web-Dashboard. Aktuell in Überarbeitung (v2) mit isolierter Technik-Kammer gegen Korrosion und optimierter Belüftung.',
  githubUrl: 'https://github.com/Minielel/AUTER',
  techStack: [
    'C++',
    'IoT / Embedded',
    '3D Printing / CAD',
    'Web Dashboard',
    'Hardware'
  ],
  images: [
    {
      src: 'assets/projects/auter/AUTER.png',
      orientation: 'landscape',
      caption: 'AUTER – Gesamtaufbau des automatisierten Terrariums'
    },
    {
      src: 'assets/projects/auter/WebDashboard.png',
      orientation: 'portrait',
      caption: 'Web-Dashboard – Sensor-Überwachung & Steuerung'
    },
    {
      src: 'assets/projects/auter/AUTER_Vase_1.jpeg',
      orientation: 'portrait',
      caption: 'Pflanzen-Vase & Bepflanzung (Detailansicht 1)'
    },
    {
      src: 'assets/projects/auter/AUTER_Vase_2.jpeg',
      orientation: 'portrait',
      caption: 'Pflanzen-Vase & Bepflanzung (Detailansicht 2)'
    },
    {
      src: 'assets/projects/auter/AUTER_Deckel.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Terrarium-Deckel mit Belüftungsauslässen'
    },
    {
      src: 'assets/projects/auter/AUTER_Drip_Layer.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Drip-Layer (Bewässerungs-Ebene)'
    },
    {
      src: 'assets/projects/auter/AUTER_Nossel.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Sprühdüsen-Halterung (Nozzle)'
    },
    {
      src: 'assets/projects/auter/AUTER_Tech_Layer_1.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Technik-Ebene 1 (Elektronik-Halterung)'
    },
    {
      src: 'assets/projects/auter/AUTER_Tech_Layer_2.png',
      orientation: 'landscape',
      caption: 'CAD-Modell: Technik-Ebene 2 (Kabel- & Modulführung)'
    }
  ]
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
},

{
  id: 'gonggi-wuerfel',
  title: '3D-Druck Gonggi-Würfel (In-Print Hardware)',
  status: 'live',
  description:
    'Spielsteine für das koreanische Geschicklichkeitsspiel Gonggi. Im 3D-Druck gefertigt mit per Druckstopp im Inneren versiegelten M5-Muttern für das perfekte Handgewicht.',
  githubUrl: 'https://github.com/Minielel/Gonggi_Wuerfel',
  techStack: [
    '3D Printing / CAD',
    'In-Print Hardware',
    'Produkt-Design'
  ],
  images: [
    {
      src: 'assets/projects/gonggi-wuerfel/Gonggi_WuerfelSet.jpeg',
      orientation: 'portrait',
      caption: 'Fertiges Gonggi-Würfelset'
    },
    {
      src: 'assets/projects/gonggi-wuerfel/Gonggi_Wuerfel.png',
      orientation: 'landscape',
      caption: 'CAD-Modell des Würfels mit innerem Hohlraum'
    }
  ]
}
];
