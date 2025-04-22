import { Routes } from '@angular/router';
import { AllMangaComponent } from './pages/all-manga/all-manga.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'manga',
    component: AllMangaComponent,
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (mode) => mode.NotFoundComponent
      ),
  },
];
