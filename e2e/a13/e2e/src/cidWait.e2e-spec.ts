import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('cidWait', () => {
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

  it('blocks emits until a task starts and ends', async () => {
    await page.navigateTo();

    // checking initial state
    const task = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    const cid = task.cid;

    expect(JSON.parse(await page.getCidWait())).toEqual(null);

    // start doesn't change the things
    await page.clickButton('start');
    expect(JSON.parse(await page.getCidWait())).toEqual(null);

    // setting payload does not change the things
    await page.clickButton('payload-3');
    expect(JSON.parse(await page.getCidWait())).toEqual(null);

    // triggers an emit
    await page.clickButton('end');
    expect(JSON.parse(await page.getCidWait())).toEqual({
      cid,
      inProgress: false,
      payload: '3',
    });

    // stream is closed, no changes are reflected.
    await page.clickButton('payload-2');
    expect(JSON.parse(await page.getCidWait())).toEqual({
      cid,
      inProgress: false,
      payload: '3',
    });
  });
});
