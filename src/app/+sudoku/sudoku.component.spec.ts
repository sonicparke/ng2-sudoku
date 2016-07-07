/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { SudokuComponent } from './sudoku.component';

describe('Component: Sudoku', () => {
  it('should create an instance', () => {
    let component = new SudokuComponent();
    expect(component).toBeTruthy();
  });
});
