import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getFeature() {
    return element(by.css('[data-role="feature"]')).getText();
  }

  getSelectCid() {
    return element(by.css('[data-role="selectCid"]')).getText();
  }

  getCidWait() {
    return element(by.css('[data-role="cidWait"]')).getText();
  }

  getHistory() {
    return element(by.css('[data-role="history"]')).getText();
  }

  clickButton(role: string) {
    return element(by.css(`button[data-role="${role}"]`)).click();
  }
}
