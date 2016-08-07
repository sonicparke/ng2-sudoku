/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe, fdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SudokuComponent } from './sudoku.component';
import { SudokuGameService } from './sudoku-game.service';
import { Sudoku } from './sudoku';

/**
 * You can mock the service out like this
 * but for now I'm just using the puzzle data
 * from the actual service
 */
class MockSudokuGameService extends SudokuGameService {
  constructor(public sudoku: Sudoku) {
    super(sudoku);
  }

  getPuzzle() {
    return Observable.of([
      ['5', '1', '6', '', '', '', '8', '4', '7'],
      ['2', '4', '7', '8', '1', '5', '3', '9', '6'],
      ['3', '8', '9', '6', '7', '4', '5', '1', '2'],
      ['8', '9', '1', '3', '5', '6', '', '', '4'],
      ['4', '7', '3', '1', '2', '9', '6', '8', '5'],
      ['6', '2', '5', '7', '4', '8', '1', '3', '9'],
      ['9', '5', '8', '4', '6', '1', '', '', '3'],
      ['1', '', '', '', '', '7', '', '', '8'],
      ['7', '', '', '', '8', '', '', '', '1']
    ]);
  }

  getSolvedPuzzle() {
    return Observable.of([
      ['5', '1', '6', '2', '9', '3', '8', '4', '7'],
      ['2', '4', '7', '8', '1', '5', '3', '9', '6'],
      ['3', '8', '9', '6', '7', '4', '5', '1', '2'],
      ['8', '9', '1', '3', '5', '6', '2', '7', '4'],
      ['4', '7', '3', '1', '2', '9', '6', '8', '5'],
      ['6', '2', '5', '7', '4', '8', '1', '3', '9'],
      ['9', '5', '8', '4', '6', '1', '7', '2', '3'],
      ['1', '6', '2', '9', '3', '7', '4', '5', '8'],
      ['7', '3', '4', '5', '8', '2', '9', '6', '1']
    ]);
  }

  getErrorPuzzle() {
    return Observable.of([
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '']
    ]);
  }

}

describe('Component: Sudoku', () => {
  let sudokuClass: Sudoku = new Sudoku();
  // let gameGenerator: SudokuGameService = new SudokuGameService(sudokuClass);
  let gameGenerator: MockSudokuGameService = new MockSudokuGameService(sudokuClass);
  let component: SudokuComponent = new SudokuComponent(gameGenerator);

  beforeEach(() => {
    component.ngOnInit();
    component.highlightSelected = '05';
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should set puzzleSolved to false on ngOnInit()', () => {
    component.puzzleSolved = true;
    component.ngOnInit();
    expect(component.puzzleSolved).toBe(false);
  });

  it('should get a puzzle', () => {
    expect(component.puzzle.length).toBe(9);
  });

  it('should get the solved puzzle', () => {
    expect(component.solved_puzzle.length).toBe(9);
  });

  it('should get a blank puzzle', () => {
    expect(component.errorPuzzle.length).toBe(9);
  });

  it('should get a copy of the original puzzle', () => {
    expect(component.originalPuzzle).toEqual(component.puzzle);
  });

  it('should be a protected square', () => {
    component.originalPuzzle[0][0] = '1';
    expect(component.isProtected(0, 0)).toBe(true);
  });

  it('should not be a protected square', () => {
    component.originalPuzzle[0][0] = '.';
    expect(component.isProtected(0, 0)).toBe(false);
  });

  it('should have answer options of 1-9', () => {
    expect(component.options).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should cheat and solve the puzzle for you and unselect the selected square', () => {
    component.cheat();
    expect(component.highlightSelected).toBe('');
    expect(component.puzzle).toEqual(component.solved_puzzle);
  });

  it('should create a new game and unselect the selected square', () => {
    component.puzzle = [];
    component.newGame();
    expect(component.highlightSelected).toBe('');
    expect(component.puzzle.length).toBe(9);
  });

  it('should select a square and set puzzle objects accordingly', () => {
    component.itemSelect('mouseevent', 0, 5, 'item');
    expect(component.highlightSelected).toBe(0 + '' + 5);
    // expect(component.selected).toEqual([0, 5]);
    expect(component.errorPuzzle[0][5]).toBe('');
  });

});
