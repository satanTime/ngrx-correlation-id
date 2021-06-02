import {CidTask} from 'ngrx-correlation-id';
import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('cidEnd', () => {
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

  it('removes cid from the task list', async () => {
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

    // starting the task
    await page.clickButton('start');
    await page.clickButton('start');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [cid, cid],
      payloads: {},
    });

    // one dispatch one removal
    await page.clickButton('end');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [cid],
      payloads: {},
    });

    // one dispatch one removal
    await page.clickButton('end');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [],
      payloads: {},
    });

    // one dispatch one removal
    await page.clickButton('end');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [],
      payloads: {},
    });
  });
});
