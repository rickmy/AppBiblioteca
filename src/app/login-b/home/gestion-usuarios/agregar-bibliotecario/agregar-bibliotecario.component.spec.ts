import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarBibliotecarioComponent } from './agregar-bibliotecario.component';

describe('AgregarBibliotecarioComponent', () => {
  let component: AgregarBibliotecarioComponent;
  let fixture: ComponentFixture<AgregarBibliotecarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarBibliotecarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarBibliotecarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
