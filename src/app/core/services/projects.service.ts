import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.model';
import { PROJECTS } from './projects.data';

/**
 * ViewModel für die Projekte. Komponenten lesen nur das Signal,
 * die eigentlichen Daten kommen aus projects.data.ts.
 */
@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly _projects = signal<Project[]>(PROJECTS);
  readonly projects = this._projects.asReadonly();

  getById(id: string): Project | undefined {
    return this._projects().find((p) => p.id === id);
  }
}
