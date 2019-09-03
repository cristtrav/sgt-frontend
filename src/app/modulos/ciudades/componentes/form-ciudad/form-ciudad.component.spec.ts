import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCiudadComponent } from './form-ciudad.component';

describe('FormCiudadComponent', () => {
  let component: FormCiudadComponent;
  let fixture: ComponentFixture<FormCiudadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCiudadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
