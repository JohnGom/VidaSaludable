import { SaludPage } from './app.po';

describe('salud App', () => {
  let page: SaludPage;

  beforeEach(() => {
    page = new SaludPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
