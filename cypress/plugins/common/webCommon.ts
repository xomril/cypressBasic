/* eslint-disable cypress/no-unnecessary-waiting */
export class WebCommon {
  convertStringToInt = (str: string): number => {
    let n: any = str.match(/\d/g);
    n = n.join('');
    return Number(n);
  };

  waitForElementTextToChange = (undesiredText: string, path: string, retires: number): any => {
    if (retires == 0) {
      throw "text didn't change after the specified retires";
    }
    Cypress.log({
      displayName: 'Wait',
      message: `Waiting ${retires}`,
    });
    console.log(`Waiting for ${path} to change form ${undesiredText}`);
    return cy
      .get(path)
      .eq(0)
      .invoke('text')
      .then((text) => {
        console.log(text);
        if (text != undesiredText) {
          return cy.wrap(text);
        }
        console.log(['testing', text, undesiredText]);
        cy.wait(3000);
        return this.waitForElementTextToChange(undesiredText, path, retires - 1);
      });
  };

  makeid = (length: number): string => {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  };

  fbassert = (value: string, expectedValue: string, errorMsg: string): any => {
    if (value != expectedValue) {
      throw new Error(`${errorMsg}\n Expecting ${value}\n but instead got ${expectedValue}`);
    }
    assert(value, expectedValue);
  };

  fbassertBoolean = (value: boolean, errorMsg: string): any => {
    if (!value) {
      throw new Error(`Expecting ${value}\n to be True`);
    }
    return assert(value);
  };
}
