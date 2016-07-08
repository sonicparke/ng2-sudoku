/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { SudokuGeneratorService } from './sudoku-generator.service';

describe('SudokuGenerator Service', () => {
  beforeEachProviders(() => [SudokuGeneratorService]);

  it('should ...',
      inject([SudokuGeneratorService], (service: SudokuGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
