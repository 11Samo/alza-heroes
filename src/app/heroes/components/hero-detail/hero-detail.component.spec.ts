import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../../../core/services/hero.service';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideLocationMocks } from '@angular/common/testing';

describe('HeroDetailComponent', () => {
  let heroServiceMock: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    // Vytvoríme mock HeroService s potrebnými metódami
    heroServiceMock = jasmine.createSpyObj('HeroService', [
      'getHeroById',
      'addHero',
      'updateHero',
      'deleteHero',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        { provide: HeroService, useValue: heroServiceMock },
        provideRouter([{ path: 'hero/:id', component: HeroDetailComponent }]),
        provideLocationMocks(),
      ],
    }).compileComponents();
  });

  it('should display an existing hero', async () => {
    const existingHero = { id: 1, name: 'Narco' };
    heroServiceMock.getHeroById.and.returnValue(existingHero);

    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl(
      'hero/1',
      HeroDetailComponent
    );
    harness.detectChanges();

    const inputElement = harness.routeNativeElement?.querySelector('input');
    expect(inputElement).not.toBeNull();
    if (inputElement) {
      expect(inputElement.value).toBe(existingHero.name);
    }
  });

  it('should display empty form for non-existing hero', async () => {
    heroServiceMock.getHeroById.and.returnValue(undefined);

    // Zmeníme URL na neexistujúce ID
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl(
      'hero/999',
      HeroDetailComponent
    );
    harness.detectChanges();

    const inputElement = harness.routeNativeElement?.querySelector('input');
    expect(inputElement).not.toBeNull();
    if (inputElement) {
      expect(inputElement.value).toBe('');
    }
  });
});
