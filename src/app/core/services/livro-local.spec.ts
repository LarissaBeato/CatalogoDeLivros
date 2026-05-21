import { TestBed } from '@angular/core/testing';

import { LivroLocal } from './livro-local';

describe('LivroLocal', () => {
  let service: LivroLocal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivroLocal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
