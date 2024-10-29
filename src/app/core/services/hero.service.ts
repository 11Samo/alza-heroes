import { Injectable } from '@angular/core';

export interface Hero {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroes: Hero[] = [
    { id: 1, name: 'Narco' },
    { id: 2, name: 'Bombasto' },
    { id: 3, name: 'Celeritas' },
    { id: 4, name: 'Magneta' },
  ];

  getHeroes(): Hero[] {
    return this.heroes.filter((hero) => hero.id !== 0);
  }

  getHeroById(id: number): Hero | undefined {
    return this.heroes.find((hero) => hero.id === id);
  }

  addHero(name: string): void {
    const newHero: Hero = {
      id: this.generateId(),
      name,
    };
    this.heroes.push(newHero);
  }

  addNewHero(name: string): void {
    if (name.trim()) {
      this.addHero(name);
    }
  }

  updateHero(updatedHero: Hero): void {
    const index = this.heroes.findIndex((hero) => hero.id === updatedHero.id);
    if (index !== -1) {
      this.heroes[index] = updatedHero;
    }
  }

  updateHeroName(hero: Hero, newName: string): void {
    if (!newName.trim()) {
      this.deleteHero(hero.id);
    } else {
      hero.name = newName;
      this.updateHero(hero);
    }
  }

  deleteHero(id: number): void {
    this.heroes = this.heroes.filter((hero) => hero.id !== id);
  }

  private generateId(): number {
    return this.heroes.length > 0
      ? Math.max(...this.heroes.map((hero) => hero.id)) + 1
      : 1;
  }
}
