import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCargosComponent } from './vista-cargos.component';

describe('VistaCargosComponent', () => {
  let component: VistaCargosComponent;
  let fixture: ComponentFixture<VistaCargosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaCargosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
