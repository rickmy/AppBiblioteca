import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNacionalidadComponent } from './agregar-nacionalidad.component';

describe('AgregarNacionalidadComponent', () => {
  let component: AgregarNacionalidadComponent;
  let fixture: ComponentFixture<AgregarNacionalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarNacionalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarNacionalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
