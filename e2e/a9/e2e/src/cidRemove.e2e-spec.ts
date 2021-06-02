import {CidTask} from 'ngrx-correlation-id';
import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('cidRemove', () => {
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

  it('removes a task with payload', async () => {
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

    await page.clickButton('start');
    await page.clickButton('payload-2');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [cid],
      payloads: {
        [cid]: '2',
      },
    });

    // assertion
    await page.clickButton('remove');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [],
      payloads: {},
    });
  });

  it('removes a task without payload', async () => {
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

    await page.clickButton('start');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [cid],
      payloads: {},
    });

    // assertion
    await page.clickButton('remove');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [],
      payloads: {},
    });
  });

  it('removes a payload without a task', async () => {
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

    await page.clickButton('payload-3');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [],
      payloads: {
        [cid]: '3',
      },
    });

    // assertion
    await page.clickButton('remove');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [],
      payloads: {},
    });
  });
});
