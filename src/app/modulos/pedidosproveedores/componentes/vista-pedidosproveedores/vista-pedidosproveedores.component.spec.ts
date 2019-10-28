import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPedidosproveedoresComponent } from './vista-pedidosproveedores.component';

describe('VistaPedidosproveedoresComponent', () => {
  let component: VistaPedidosproveedoresComponent;
  let fixture: ComponentFixture<VistaPedidosproveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPedidosproveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPedidosproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
