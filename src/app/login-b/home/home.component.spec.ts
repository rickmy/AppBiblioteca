import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponentB } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponentB;
  let fixture: ComponentFixture<HomeComponentB>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponentB ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponentB);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
