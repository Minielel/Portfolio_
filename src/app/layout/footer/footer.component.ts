import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface SocialLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  // TODO: eigene Profile eintragen
  readonly socialLinks: SocialLink[] = [
    { label: 'GH', url: 'https://github.com/Minielel' },
    { label: 'in', url: 'https://www.linkedin.com/in/daniel-fast-5b35a2421/' }
  ];

  readonly year = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
