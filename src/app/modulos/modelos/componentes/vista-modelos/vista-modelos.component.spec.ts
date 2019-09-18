import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaModelosComponent } from './vista-modelos.component';

describe('VistaModelosComponent', () => {
  let component: VistaModelosComponent;
  let fixture: ComponentFixture<VistaModelosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaModelosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
