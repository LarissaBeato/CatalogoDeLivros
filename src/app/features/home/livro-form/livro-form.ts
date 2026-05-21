import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroLocal } from '../../../core/services/livro-local';

@Component({
  selector: 'app-livro-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './livro-form.html',
  styleUrl: './livro-form.css',
})
export class LivroForm implements OnInit {
  private fb = inject(FormBuilder);
  private livroLocalService = inject(LivroLocal);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: number | null = null;

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    autor: ['', [Validators.required, Validators.minLength(3)]],
    genero: ['', [Validators.required]],
    resumo: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.editingId = Number(id);
      const livro = this.livroLocalService.getById(this.editingId);
      if (livro) {
        this.form.patchValue({
          titulo: livro.titulo,
          autor: livro.autor,
          genero: livro.genero,
          resumo: livro.resumo,
        });
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    if (this.editingId !== null) {
      this.livroLocalService.update({
        id: this.editingId,
        titulo: formValue.titulo,
        autor: formValue.autor,
        genero: formValue.genero,
        resumo: formValue.resumo,
      });
    } else {
      this.livroLocalService.add({
        id: Date.now(),
        titulo: formValue.titulo,
        autor: formValue.autor,
        genero: formValue.genero,
        resumo: formValue.resumo,
      });
    }

    this.router.navigate(['/livros']);
  }
}
