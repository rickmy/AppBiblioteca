import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoTextoComponent } from './agregar-tipo-texto.component';

describe('AgregarTipoTextoComponent', () => {
  let component: AgregarTipoTextoComponent;
  let fixture: ComponentFixture<AgregarTipoTextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoTextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
