import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaVehiculosComponent } from './vista-vehiculos.component';

describe('VistaVehiculosComponent', () => {
  let component: VistaVehiculosComponent;
  let fixture: ComponentFixture<VistaVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
