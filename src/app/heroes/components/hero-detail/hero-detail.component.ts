import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from '../../../core/services/hero.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../../truncate.pipe';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TruncatePipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent implements OnInit {
  hero: Hero = { id: 0, name: '' };
  isNewHero: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam === 'new') {
      this.isNewHero = true;
    } else {
      const id = Number(idParam);
      const foundHero = this.heroService.getHeroById(id);

      if (foundHero) {
        this.hero = foundHero;
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  updateHeroName(name: string): void {
    if (!name.trim() && !this.isNewHero) {
      this.heroService.deleteHero(this.hero.id);
      this.router.navigate(['/heroes']);
    } else {
      this.heroService.updateHeroName(this.hero, name);
    }
  }

  saveNewHero(): void {
    this.heroService.addNewHero(this.hero.name);
    this.router.navigate(['/heroes']);
  }
}
