import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

import { Sudoku } from './sudoku';

@Injectable()
export class SudokuGameService {

    public puzzleString: string;
    public puzzle: {};
    public solvedPuzzleString: string | boolean;
    public solved_puzzle: {};

    constructor(public sudoku: Sudoku) {}


    getPuzzle(difficulty): Observable<any> {
      this.puzzleString = this.sudoku.generate(difficulty, true);
      this.puzzle = this.sudoku.boardStringToGrid(this.puzzleString);
      return new Observable((observer: any) => {
        observer.next(this.puzzle);

        return () => {
          console.log('detroyed');
        };
      });
    }

    getOriginalPuzzle(): Observable<any> {
      return new Observable((observer: any) => {
        let originalPuzzle = _.cloneDeep(this.puzzle);
        observer.next(originalPuzzle);
        console.log('originalPuzzle :', originalPuzzle);

        return () => {
          console.log('detroyed');
        };
      });
    }

    addAnswer(rowIndex: number, index: number, item: any) {
      this.puzzle[rowIndex][index] = item.toString();
    }

    clearSelectedAnswer(rowIndex: number, index: number, item: any) {
      this.puzzle[rowIndex][index] = '';
    }

    getSolvedPuzzle(): Observable<any> {
      return new Observable((observer: any) => {
        this.solvedPuzzleString = this.sudoku.solve(this.puzzleString);
        this.solved_puzzle = this.sudoku.boardStringToGrid(this.solvedPuzzleString);
        observer.next(this.solved_puzzle);

        return () => {
          console.log('detroyed');
        };
      });
    }

}
