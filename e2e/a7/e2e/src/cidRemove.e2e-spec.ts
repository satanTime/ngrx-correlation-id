import { CidTask } from 'ngrx-correlation-id';
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

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

    // checking initial state
    const task: CidTask = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    const cid: string = task.cid;

    await page.clickButton('start');
    await page.clickButton('payload-2');
    let state: any = JSON.parse(await page.getFeature());
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

    // checking initial state
    const task: CidTask = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    const cid: string = task.cid;

    await page.clickButton('start');
    let state: any = JSON.parse(await page.getFeature());
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

    // checking initial state
    const task: CidTask = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    const cid: string = task.cid;

    await page.clickButton('payload-3');
    let state: any = JSON.parse(await page.getFeature());
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
