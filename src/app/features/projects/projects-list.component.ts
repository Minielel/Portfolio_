import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProjectsService } from '../../core/services/projects.service';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [NgFor, ProjectCardComponent, RevealDirective],
  templateUrl: './projects-list.component.html'
})
export class ProjectsListComponent {
  private readonly projectsService = inject(ProjectsService);
  readonly projects = this.projectsService.projects;
}
