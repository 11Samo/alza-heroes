import { Component, OnInit } from '@angular/core';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { Hero, HeroService } from '../../../core/services/hero.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TruncatePipe } from '../../../truncate.pipe';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [HeroCardComponent, CommonModule, RouterModule, TruncatePipe],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.heroes = this.heroService.getHeroes();

    const addNewHeroExists = this.heroes.some((hero) => hero.id === 0);

    if (!addNewHeroExists) {
      this.heroes.unshift({
        id: 0,
        name: '+ Add New Hero',
      });
    }
  }

  selectHero(hero: Hero): void {
    this.selectedHero = hero;
  }

  viewHeroDetail(): void {
    if (this.selectedHero) {
      this.router.navigate(['/hero', this.selectedHero.id]);
    }
  }
}
