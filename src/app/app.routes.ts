import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { LivroForm } from './features/livros/livro-form/livro-form';
import { LivroList } from './features/livros/livro-list/livro-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cadastrar-livro', component: LivroForm },
  { path: 'livros', component: LivroList },
  { path: '**', redirectTo: '' },
];
