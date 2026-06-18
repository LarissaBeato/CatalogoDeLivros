import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'cadastrar-livro',
    loadComponent: () => import('./features/livros/livro-form/livro-form').then((m) => m.LivroForm),
    canActivate: [authGuard],
  },
  {
    path: 'livros',
    loadComponent: () => import('./features/livros/livro-list/livro-list').then((m) => m.LivroList),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
