import { provideRouter, RouterConfig } from '@angular/router';
import { SudokuRoutes } from './+sudoku/sudoku.routes';

export const routes: RouterConfig = [
  ...SudokuRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
