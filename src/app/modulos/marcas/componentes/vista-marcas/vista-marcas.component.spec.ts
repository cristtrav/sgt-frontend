import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaMarcasComponent } from './vista-marcas.component';

describe('VistaMarcasComponent', () => {
  let component: VistaMarcasComponent;
  let fixture: ComponentFixture<VistaMarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaMarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
