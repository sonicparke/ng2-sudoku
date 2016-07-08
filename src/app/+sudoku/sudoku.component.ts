import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { SudokuGeneratorService } from './sudoku-generator.service';

@Component({
  moduleId: module.id,
  selector: 'app-sudoku',
  templateUrl: 'sudoku.component.html',
  styleUrls: ['sudoku.component.css'],
  directives: [

  ],
  providers: [
    SudokuGeneratorService
  ]
})
export class SudokuComponent implements OnInit {
  public title: string = 'Sudoku Yo!!';
  public isLoading: boolean;
  public puzzle: string[][];
  public solved_puzzle: string[][];
  public error_puzzle: string[][];
  public originalPuzzle: string[][];
  public isError: any;
  public highlightSelected: string;
  public selected: number[];
  public options: number[];
  public puzzleSolved: boolean;

  constructor(private gameGenerator: SudokuGeneratorService) {}

  ngOnInit() {
    this.getPuzzle();
    this.getPuzzleAnswerOptions();
    this.setOriginalPuzzle();
    this.getSolvedPuzzle();
    this.getErrorPuzzle();
    this.puzzleSolved = false;
  }

  getPuzzle() {
    this.isLoading = true;
    this.gameGenerator.getPuzzle().subscribe(
      (res: any) => {
        this.puzzle = res;
      },
      (error: any) => {
        this.isLoading = false;
        this.isError = true;
      });
  }

  getSolvedPuzzle() {
    this.gameGenerator.getSolvedPuzzle().subscribe(
      (res: any) => {
        this.solved_puzzle = res;
      },
      (error: any) => {
        this.isError = true;
      });
  }

  setOriginalPuzzle() {
    this.originalPuzzle = _.cloneDeep(this.puzzle);
  }

  isProtected(rowIndex, index) {
    if (this.originalPuzzle[rowIndex][index] === '') {
      return false;
    } else {
      return true;
    }
  }

  getOriginalPuzzle() {
      this.gameGenerator.getOriginalPuzzle().subscribe(
      (res: any) => {
        this.originalPuzzle = res;
      },
      (error: any) => {
        this.isError = true;
      });
  }

  getErrorPuzzle() {
    this.gameGenerator.getErrorPuzzle().subscribe(
      (res: any) => {
        this.error_puzzle = res;
      },
      (error: any) => {
        this.isError = true;
      });
  }

  getPuzzleAnswerOptions() {
    this.options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  itemSelect($event, rowIndex, index, item) {
    if (this.originalPuzzle[rowIndex][index] === '') {
      this.highlightSelected = rowIndex + '' + index;
      this.selected = [rowIndex, index];
      this.error_puzzle[rowIndex][index] = '';
    }
  }

  optionSelect(item) {
    this.gameGenerator.addAnswer(this.selected[0], this.selected[1], item);
  }

  clearSelectedAnswer(item) {
    this.gameGenerator.clearSelectedAnswer(this.selected[0], this.selected[1], item);
  }

  submitPuzzle() {
    this.highlightSelected = '';
    // if((this.puzzle && this.solved_puzzle) && _.isEqual(this.puzzle, this.solved_puzzle)) {
    //   this.puzzleSolved = true;
    // } else {
    //   _.forEach(this.puzzle, (value, row) => {
    //   _.forEach(value, (value, key) => {
    //     if((this.puzzle && this.solved_puzzle) && _.isEqual(this.puzzle[row][key], this.solved_puzzle[row][key])) {
    //     }
    //     else {
    //       this.error_puzzle[row][key] = 'error';
    //     }
    //   })
    //  })
    // }
  }

  solvePuzzle() {
    this.highlightSelected = '';
    this.puzzle = this.solved_puzzle;
  }

  newGame() {
    this.highlightSelected = '';
    this.ngOnInit();
  }

}
