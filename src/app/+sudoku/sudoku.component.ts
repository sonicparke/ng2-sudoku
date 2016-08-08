import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { SudokuGameService } from './sudoku-game.service';
import { Sudoku } from './sudoku';
import { RemoveDotPipe } from '../shared/remove-dot.pipe';

@Component({
  moduleId: module.id,
  selector: 'app-sudoku',
  templateUrl: 'sudoku.component.html',
  styleUrls: ['sudoku.component.css'],
  pipes: [
    RemoveDotPipe
  ],
  providers: [
    SudokuGameService,
    Sudoku
  ]
})
export class SudokuComponent implements OnInit {
  public title: string = 'Sudoku Yo!!';
  public isLoading: boolean;
  public puzzle: string[][];
  public solved_puzzle: string[][];
  public errorPuzzle: string[][];
  public originalPuzzle: string[][];
  public isError: any;
  public highlightSelected: string;
  public selected: number[];
  public options: number[];
  public puzzleSolved: boolean;
  public difficulty: string;

  constructor(private gameGenerator: SudokuGameService) {}

  ngOnInit() {
    this.getPuzzle(this.difficulty);
    this.getPuzzleAnswerOptions();
    this.setOriginalPuzzle();
    this.getSolvedPuzzle();
    this.setErrorPuzzle();
    this.puzzleSolved = false;
  }

  getPuzzle(difficulty) {
    this.isLoading = true;
    this.gameGenerator.getPuzzle(difficulty).subscribe(
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

  setErrorPuzzle() {
    this.errorPuzzle = _.cloneDeep(this.originalPuzzle);
  }

  isProtected(rowIndex, index) {
    if (this.originalPuzzle[rowIndex][index] === '.') {
      return false;
    } else {
      return true;
    }
  }

  getPuzzleAnswerOptions() {
    this.options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  itemSelect($event, rowIndex, index, item) {
    if (this.originalPuzzle[rowIndex][index] === '.') {
      this.highlightSelected = rowIndex + '' + index;
      this.selected = [rowIndex, index];
      this.errorPuzzle[rowIndex][index] = '';
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
    if ((this.puzzle && this.solved_puzzle) && _.isEqual(this.puzzle, this.solved_puzzle)) {
      this.puzzleSolved = true;
    } else {
      _.forEach(this.puzzle, (value, row) => {
        _.forEach(value, (deep_value, key) => {
          if ((this.puzzle && this.solved_puzzle) && _.isEqual(this.puzzle[row][key], this.solved_puzzle[row][key])) {
          } else {
            this.errorPuzzle[row][key] = 'error';
          }
        });
     });
    }
  }

  cheat() {
    this.highlightSelected = '';
    this.puzzle = this.solved_puzzle;
  }

  newGame() {
    this.highlightSelected = '';
    this.ngOnInit();
  }

}
