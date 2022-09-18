import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('selectCid', () => {
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

  it('returns default structure if the task does not exist', async () => {
    await page.navigateTo();

    // checking initial state
    const task = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
  });

  it('returns inProgress true if the task exists', async () => {
    await page.navigateTo();

    // checking initial state
    const task = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    const cid = task.cid;

    await page.clickButton('start');
    expect(JSON.parse(await page.getSelectCid())).toEqual({
      cid,
      inProgress: true,
    });
  });

  it('ignores payload when inProgress is true', async () => {
    await page.navigateTo();

    // checking initial state
    const task = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    const cid = task.cid;

    await page.clickButton('start');
    await page.clickButton('payload-2');
    expect(JSON.parse(await page.getSelectCid())).toEqual({
      cid,
      inProgress: true,
    });
  });

  it('respects payload when inProgress is false', async () => {
    await page.navigateTo();

    // checking initial state
    const task = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    const cid = task.cid;

    await page.clickButton('start');
    await page.clickButton('payload-2');
    await page.clickButton('end');
    expect(JSON.parse(await page.getSelectCid())).toEqual({
      cid,
      inProgress: false,
      payload: '2',
    });

    await page.clickButton('payload-3');
    expect(JSON.parse(await page.getSelectCid())).toEqual({
      cid,
      inProgress: false,
      payload: '3',
    });
  });
});
