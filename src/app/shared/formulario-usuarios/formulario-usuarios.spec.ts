import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUsuarios } from './formulario-usuarios';

describe('FormularioUsuarios', () => {
  let component: FormularioUsuarios;
  let fixture: ComponentFixture<FormularioUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioUsuarios],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
