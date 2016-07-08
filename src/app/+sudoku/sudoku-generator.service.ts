import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class SudokuGeneratorService {

    puzzle: Puzzle;

    constructor() {
      this.puzzle = new Puzzle();
    }

    getOriginalPuzzle(): Observable<any> {
      return new Observable((observer: any) => {
        let originalPuzzle = _.cloneDeep(this.puzzle.grid);
        observer.next(originalPuzzle);

        return () => {
          console.log('detroyed');
        };
      });
    }

    getPuzzle(): Observable<any> {
      return new Observable((observer: any) => {
        observer.next(this.puzzle.grid);

        return () => {
          console.log('detroyed');
        };
      });
    }

    addAnswer(rowIndex: number, index: number, item: any) {
      this.puzzle.grid[rowIndex][index] = item.toString();
    }

    clearSelectedAnswer(rowIndex: number, index: number, item: any) {
      this.puzzle.grid[rowIndex][index] = '';
    }

    getSolvedPuzzle(): Observable<any> {
      return new Observable((observer: any) => {
        observer.next(this.puzzle.solved_grid);

        return () => {
          console.log('detroyed');
        };
      });
    }

    getErrorPuzzle(): Observable<any> {
      return new Observable((observer: any) => {
        observer.next(this.puzzle.error_grid);

        return () => {
          console.log('detroyed');
        };
      });
    }

}


export class Puzzle {
  grid: string[][];
  solved_grid: string[][];
  error_grid: string[][];

  constructor() {
    this.grid = [
      ['5', '1', '6', '', '', '', '8', '4', '7'],
      ['2', '4', '7', '8', '1', '5', '3', '9', '6'],
      ['3', '8', '9', '6', '7', '4', '5', '1', '2'],
      ['8', '9', '1', '3', '5', '6', '', '', '4'],
      ['4', '7', '3', '1', '2', '9', '6', '8', '5'],
      ['6', '2', '5', '7', '4', '8', '1', '3', '9'],
      ['9', '5', '8', '4', '6', '1', '', '', '3'],
      ['1', '', '', '', '', '7', '', '', '8'],
      ['7', '', '', '', '8', '', '', '', '1']
    ];

    this.solved_grid = [
      ['5', '1', '6', '2', '9', '3', '8', '4', '7'],
      ['2', '4', '7', '8', '1', '5', '3', '9', '6'],
      ['3', '8', '9', '6', '7', '4', '5', '1', '2'],
      ['8', '9', '1', '3', '5', '6', '2', '7', '4'],
      ['4', '7', '3', '1', '2', '9', '6', '8', '5'],
      ['6', '2', '5', '7', '4', '8', '1', '3', '9'],
      ['9', '5', '8', '4', '6', '1', '7', '2', '3'],
      ['1', '6', '2', '9', '3', '7', '4', '5', '8'],
      ['7', '3', '4', '5', '8', '2', '9', '6', '1']
    ];

    this.error_grid = [
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '']
    ];
  }

}
