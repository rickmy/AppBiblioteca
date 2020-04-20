import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDevolucionComponent } from './agregar-devolucion.component';

describe('AgregarDevolucionComponent', () => {
  let component: AgregarDevolucionComponent;
  let fixture: ComponentFixture<AgregarDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
