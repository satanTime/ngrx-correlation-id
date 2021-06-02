import {CidTask} from 'ngrx-correlation-id';
import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('cidStart', () => {
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

  it('adds cid to the task list', async () => {
    await page.navigateTo();
    let state: any;
    let task: CidTask;
    let cid: string;

    // checking initial state
    task = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    cid = task.cid;

    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [],
      payloads: {},
    });

    await page.clickButton('start');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [cid],
      payloads: {},
    });

    await page.clickButton('start');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [cid, cid],
      payloads: {},
    });
  });
});
