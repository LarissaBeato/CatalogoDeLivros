import { TestBed } from '@angular/core/testing';

import { LivroApi } from './livro-api';

describe('LivroApi', () => {
  let service: LivroApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivroApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
