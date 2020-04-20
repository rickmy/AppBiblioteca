import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTextoComponent } from './agregar-texto.component';

describe('AgregarTextoComponent', () => {
  let component: AgregarTextoComponent;
  let fixture: ComponentFixture<AgregarTextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
