import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEjemplaresComponent } from './agregar-ejemplares.component';

describe('AgregarEjemplaresComponent', () => {
  let component: AgregarEjemplaresComponent;
  let fixture: ComponentFixture<AgregarEjemplaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEjemplaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEjemplaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
