import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Project } from '../../../../core/models/project.model';
import { ProjectGalleryComponent } from '../project-gallery/project-gallery.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [ProjectGalleryComponent, NgIf, NgFor],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Input({ required: true }) index = 0;
  detailsOpen = false;

  get statusLabel(): string {
    return { live: 'Live', progress: 'In Arbeit', archived: 'Archiviert' }[this.project.status];
  }

  get indexLabel(): string {
    return String(this.index + 1).padStart(2, '0');
  }

  toggleDetails(): void {
    this.detailsOpen = !this.detailsOpen;
  }
}
