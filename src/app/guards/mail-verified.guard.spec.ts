import { TestBed } from '@angular/core/testing';

import { MailVerifiedGuard } from './mail-verified.guard';

describe('MailVerifiedGuard', () => {
  let guard: MailVerifiedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MailVerifiedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
