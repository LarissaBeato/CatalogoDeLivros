import { Injectable } from '@angular/core';
import { Livro } from '../models/livro.model';

@Injectable({
  providedIn: 'root',
})
export class LivroLocal {
  private storageKey = 'livros';

  getAll(): Livro[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveAll(livros: Livro[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(livros));
  }

  add(livro: Livro): void {
    const livros = this.getAll();
    livros.push(livro);
    this.saveAll(livros);
  }

  getById(id: number): Livro | undefined {
    return this.getAll().find((livro) => livro.id === id);
  }

  update(updatedLivro: Livro): void {
    const livros = this.getAll().map((livro) =>
      livro.id === updatedLivro.id ? updatedLivro : livro,
    );
    this.saveAll(livros);
  }

  delete(id: number): void {
    const livros = this.getAll().filter((livro) => livro.id !== id);
    this.saveAll(livros);
  }
}
