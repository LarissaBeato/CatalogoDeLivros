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
  loading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadLivros();
  }

  loadLivros(): void {
    this.loading = true;
    this.livroApiService.getAll().subscribe({
      next: (response) => {
        this.livros = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar livros.';
        this.loading = false;
      },
    });
  }

  edit(id: string): void {
    this.router.navigate(['/cadastrar-livro'], {
      queryParams: { id },
    });
  }

  remove(id: string): void {
    if (confirm('Deseja realmente excluir este livro?')) {
      this.livroApiService.delete(id).subscribe({
        next: () => {
          this.successMessage = 'Livro excluído com sucesso!';
          this.loadLivros();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: () => {
          this.errorMessage = 'Erro ao excluir livro.';
        },
      });
    }
  }
}
