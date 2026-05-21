import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Livro } from '../../../core/models/livro.model';
import { LivroApi } from '../../../core/services/livro-api';

@Component({
  selector: 'app-livro-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './livro-list.html',
  styleUrl: './livro-list.css',
})
export class LivroList implements OnInit {
  private livroApiService = inject(LivroApi);
  private router = inject(Router);

  livros: Livro[] = [];

  ngOnInit(): void {
    this.loadLivros();
  }

  loadLivros(): void {
    this.livroApiService.getAll().subscribe({
      next: (response) => {
        this.livros = response;
      },
      error: (error) => {
        console.error('Erro ao carregar livros', error);
      },
    });
  }

  edit(id: number): void {
    this.router.navigate(['/cadastrar-livro'], {
      queryParams: { id },
    });
  }

  remove(id: number): void {
    //this.livroLocalService.delete(id);
    this.loadLivros();
  }
}
