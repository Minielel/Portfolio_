import { Component } from '@angular/core';
import { AntColonyComponent } from '../ant-colony/ant-colony.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AntColonyComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {}
