import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallepedidoproveedorComponent } from './detallepedidoproveedor.component';

describe('DetallepedidoproveedorComponent', () => {
  let component: DetallepedidoproveedorComponent;
  let fixture: ComponentFixture<DetallepedidoproveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallepedidoproveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallepedidoproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
