/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { SudokuGameService } from './sudoku-game.service';
import { Sudoku } from './sudoku';

describe('SudokuGameService', () => {
  beforeEachProviders(() => [
    SudokuGameService,
    Sudoku
  ]);

  it('should inject the service',
    inject([SudokuGameService], (service: SudokuGameService) => {
      expect(service).toBeTruthy();
    }));
});
