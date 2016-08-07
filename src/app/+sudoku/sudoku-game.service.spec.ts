/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { SudokuGameService } from './sudoku-game.service';

describe('SudokuGenerator Service', () => {
  beforeEachProviders(() => [SudokuGameService]);

  it('should ...',
      inject([SudokuGameService], (service: SudokuGameService) => {
    expect(service).toBeTruthy();
  }));
});
