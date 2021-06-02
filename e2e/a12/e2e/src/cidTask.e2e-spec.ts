import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('cidTask', () => {
  let page: AppPage;

  beforeAll(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry),
    );
  });

  it('completes of success', async () => {
    await page.navigateTo();

    // checking initial state
    const task = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    const cid = task.cid;

    await page.clickButton('success');
    expect(JSON.parse(await page.getSelectCid())).toEqual({
      cid,
      inProgress: false,
      payload: '1',
    });
  });

  it('completes of failure', async () => {
    await page.navigateTo();

    // checking initial state
    const task = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    const cid = task.cid;

    await page.clickButton('failure');
    expect(JSON.parse(await page.getSelectCid())).toEqual({
      cid,
      inProgress: false,
    });
  });
});
