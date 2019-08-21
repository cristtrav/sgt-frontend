import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCiudadesComponent } from './vista-ciudades.component';

describe('VistaCiudadesComponent', () => {
  let component: VistaCiudadesComponent;
  let fixture: ComponentFixture<VistaCiudadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaCiudadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
