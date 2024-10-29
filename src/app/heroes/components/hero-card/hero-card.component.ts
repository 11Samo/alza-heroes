import { Component, Input } from '@angular/core';
import { Hero } from '../../../core/services/hero.service';
import { RouterModule } from '@angular/router';
import { HeroNameLengthDirective } from '../../../directives/hero-name-length.directive';
import { TruncatePipe } from '../../../truncate.pipe';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [RouterModule, HeroNameLengthDirective, TruncatePipe],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent {
  @Input() hero!: Hero;
}
