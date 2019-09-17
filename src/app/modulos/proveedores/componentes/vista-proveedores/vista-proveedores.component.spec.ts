import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaProveedoresComponent } from './vista-proveedores.component';

describe('VistaProveedoresComponent', () => {
  let component: VistaProveedoresComponent;
  let fixture: ComponentFixture<VistaProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
