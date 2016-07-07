import { RouterConfig } from '@angular/router';
import { SudokuComponent } from './sudoku.component';

export const SudokuRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: '/sudoku',
    terminal: true,
  },
  {
    path: 'sudoku',
    component: SudokuComponent,
  }
];
