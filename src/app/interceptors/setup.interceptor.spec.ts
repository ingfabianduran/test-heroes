import { TestBed } from '@angular/core/testing';

import { SetupInterceptor } from './setup.interceptor';

describe('SetupInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SetupInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SetupInterceptor = TestBed.inject(SetupInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
