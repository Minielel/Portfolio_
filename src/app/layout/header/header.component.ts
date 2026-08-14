import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  readonly theme = this.themeService.theme;

  onToggleTheme(): void {
    this.themeService.toggle();
  }
}
