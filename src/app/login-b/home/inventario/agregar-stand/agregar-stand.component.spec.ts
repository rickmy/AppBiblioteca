import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarStandComponent } from './agregar-stand.component';

describe('AgregarStandComponent', () => {
  let component: AgregarStandComponent;
  let fixture: ComponentFixture<AgregarStandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarStandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
