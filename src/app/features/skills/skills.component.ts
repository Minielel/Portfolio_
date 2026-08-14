import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SKILLS } from '../../core/services/skills.data';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor, RevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  readonly groups = SKILLS;
}
