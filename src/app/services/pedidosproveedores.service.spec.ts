import { TestBed } from '@angular/core/testing';

import { PedidosproveedoresService } from './pedidosproveedores.service';

describe('PedidosproveedoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidosproveedoresService = TestBed.get(PedidosproveedoresService);
    expect(service).toBeTruthy();
  });
});
