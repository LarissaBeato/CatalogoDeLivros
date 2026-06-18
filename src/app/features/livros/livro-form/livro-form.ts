import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroApi } from '../../../core/services/livro-api';

@Component({
  selector: 'app-livro-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './livro-form.html',
  styleUrl: './livro-form.css',
})
export class LivroForm implements OnInit {
  private fb = inject(FormBuilder);
  private livroApiService = inject(LivroApi);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading = false;
  loadingData = false;
  successMessage = '';
  errorMessage = '';
  id: string | null = null;

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    autor: ['', [Validators.required, Validators.minLength(3)]],
    genero: ['', [Validators.required]],
    resumo: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');

    if (this.id) {
      this.loadLivro(this.id);
    }
  }

  loadLivro(id: string) {
    this.loadingData = true;
    this.livroApiService.getById(id).subscribe({
      next: (livro) => {
        this.form.patchValue(livro);
        this.loadingData = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar livro.';
        this.loadingData = false;
      },
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.form.getRawValue();

    if (this.id) {
      this.livroApiService.update(this.id, formValue).subscribe({
        next: () => {
          this.successMessage = 'Livro atualizado com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/livros']), 2000);
        },
        error: () => {
          this.errorMessage = 'Erro ao atualizar livro.';
          this.loading = false;
        },
      });
    } else {
      this.livroApiService.create(formValue).subscribe({
        next: () => {
          this.successMessage = 'Livro cadastrado com sucesso!';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/livros']), 2000);
        },
        error: () => {
          this.errorMessage = 'Erro ao cadastrar livro.';
          this.loading = false;
        },
      });
    }
  }
}
