import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Livro } from '../models/livro.model';

type FirebaseLivro = Omit<Livro, 'id'> & { id?: unknown };

@Injectable({
  providedIn: 'root',
})
export class LivroApi {
  private http = inject(HttpClient);
  private apiUrl = 'https://catalogodelivros-25cb6-default-rtdb.firebaseio.com/livros';
  private sufix = '.json';

  getAll(): Observable<Livro[]> {
    return this.http.get<Record<string, FirebaseLivro> | null>(this.apiUrl + this.sufix).pipe(
      map((response) => {
        if (!response) {
          return [];
        }

        return Object.entries(response).map(([id, livro]) => {
          const { id: _ignoredId, ...livroData } = livro;

          return {
            id: id as any, 
            ...livroData,
          };
        });
      }),
    );
  }

  getById(id: string): Observable<Livro> {
    return this.http.get<FirebaseLivro | null>(`${this.apiUrl}/${id}${this.sufix}`).pipe(
      map((livro) => {
        if (!livro) {
          throw new Error('Livro não encontrado');
        }

        const { id: _ignoredId, ...livroData } = livro;

        return {
          id: id as any,
          ...livroData,
        };
      }),
    );
  }

  create(livro: Omit<Livro, 'id'>): Observable<Livro> {
    return this.http.post<{ name: string }>(this.apiUrl + this.sufix, livro).pipe(
      map((response) => ({
        id: response.name as any,
        ...livro,
      })),
    );
  }

  update(id: string, livro: Omit<Livro, 'id'>): Observable<Livro> {
    return this.http.put<Omit<Livro, 'id'>>(`${this.apiUrl}/${id}${this.sufix}`, livro).pipe(
      map((response) => ({
        id: id as any,
        ...response,
      })),
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
  }
}
