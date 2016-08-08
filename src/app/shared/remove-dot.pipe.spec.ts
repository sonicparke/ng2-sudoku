/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe, fdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { RemoveDotPipe } from './remove-dot.pipe';

describe('Pipe: RemoveDot', () => {
  let pipe: RemoveDotPipe;

  beforeEach(() => {
    pipe = new RemoveDotPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter out dots', () => {
    expect(pipe.transform('.')).toBe('');
  });
});
