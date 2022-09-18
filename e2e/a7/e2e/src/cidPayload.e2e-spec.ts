import { CidTask } from 'ngrx-correlation-id';
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('cidPayload', () => {
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

  it('adds payload', async () => {
    await page.navigateTo();

    // checking initial state
    const task: CidTask = JSON.parse(await page.getSelectCid());
    expect(task).toEqual({
      cid: jasmine.stringMatching(/.+/),
      inProgress: false,
    });
    const cid: string = task.cid;

    let state: any = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [],
      payloads: {},
    });

    // payload should be present
    await page.clickButton('payload-2');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [],
      payloads: {
        [cid]: '2',
      },
    });

    // payload should be present
    await page.clickButton('payload-3');
    state = JSON.parse(await page.getFeature());
    expect(state).toEqual({
      tasks: [],
      payloads: {
        [cid]: '3',
      },
    });
  });
});
