import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro.model';

@Injectable({
  providedIn: 'root',
})
export class LivroApi {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/livros';

  getAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }
}
