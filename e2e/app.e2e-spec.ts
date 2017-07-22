import { YourstoriesuiPage } from './app.po';

describe('yourstoriesui App', () => {
  let page: YourstoriesuiPage;

  beforeEach(() => {
    page = new YourstoriesuiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
