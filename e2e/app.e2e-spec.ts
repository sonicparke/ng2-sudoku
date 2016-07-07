import { Ng2SudokuPage } from './app.po';

describe('ng2-sudoku App', function() {
  let page: Ng2SudokuPage;

  beforeEach(() => {
    page = new Ng2SudokuPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
