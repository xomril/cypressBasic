// in cypress/support/index.d.ts
// load type definitions that come with Cypress module

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Chainable {
    waitForElementTextToChange(desiredText: string, path: string, retries: number): Chainable<Element>;
    waitForXElementTextToChange(desiredText: string, xpath: string, retries: number): Chainable<Element>;
    waitForElementTextToDisappear(undesiredText: string, path: string, retries: number): Chainable<Element>;
    findByXpath(xpath: string): Chainable<JQuery<HTMLElement>>;
    logger(txt: string, level: string): Chainable<Element>;
    step(description: string): Chainable<Element>;
    saveLocalStorage(currentUser: string): Chainable<Element>;
    restoreLocalStorage(): Chainable<Element>;
  }
}
