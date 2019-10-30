import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaComprasComponent } from './vista-compras.component';

describe('VistaComprasComponent', () => {
  let component: VistaComprasComponent;
  let fixture: ComponentFixture<VistaComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
