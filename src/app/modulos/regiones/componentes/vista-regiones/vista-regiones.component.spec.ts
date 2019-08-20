import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaRegionesComponent } from './vista-regiones.component';

describe('VistaRegionesComponent', () => {
  let component: VistaRegionesComponent;
  let fixture: ComponentFixture<VistaRegionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaRegionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaRegionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
