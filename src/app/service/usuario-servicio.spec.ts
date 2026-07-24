import { TestBed } from '@angular/core/testing';

import { UsuarioServicio } from './usuario-servicio';

describe('UsuarioServicio', () => {
  let service: UsuarioServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
