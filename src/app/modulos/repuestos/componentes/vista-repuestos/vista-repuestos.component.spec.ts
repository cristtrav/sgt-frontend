import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaRepuestosComponent } from './vista-repuestos.component';

describe('VistaRepuestosComponent', () => {
  let component: VistaRepuestosComponent;
  let fixture: ComponentFixture<VistaRepuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaRepuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaRepuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
