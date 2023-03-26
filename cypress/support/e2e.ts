/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress-xpath" />
import 'cypress-wait-until';
import { WebCommon } from '../plugins/common/webCommon';

const commands = new WebCommon();
const LOCAL_STORAGE = {};
const currentSession = {
  user: '',
};

require('cypress-xpath');

Cypress.Commands.add('waitForElementTextToChange', (desiredText: string, path: string, retries: number) => {
  function waitForElementTextInternal(desiredText: string, path: string, r: number) {
    if (r == 0) {
      throw new Error(`"${desiredText}" didn't appear after ${retries} retires`);
    }
    return cy
      .get(path)
      .eq(0)
      .invoke('text')
      .then((text) => {
        Cypress.log({
          displayName: 'Wait',
          message: `found ${text}`,
        });
        if (text.includes(desiredText)) {
          return cy.wrap(text);
        }

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(10000);
        r--;
        Cypress.log({
          displayName: 'Wait',
          message: `Waiting ${retries - r} out of ${retries} for "${desiredText}"`,
        });
        return waitForElementTextInternal(desiredText, path, r);
      });
  }
  return waitForElementTextInternal(desiredText, path, retries);
});

Cypress.Commands.add('waitForElementTextToDisappear', (undesiredText: string, path: string, retries: number) => {
  function waitForElementTextInternal(undesiredText: string, path: string, retires: number) {
    if (retires == 0) {
      throw "text didn't appear after the specified retires";
    }
    return cy
      .get(path)
      .eq(0)
      .invoke('text')
      .then((text) => {
        Cypress.log({
          displayName: 'Wait',
          message: `Waiting ${retries}`,
        });
        if (text != undesiredText) {
          return cy.wrap(text);
        }

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(10000);
        retires--;
        return waitForElementTextInternal(undesiredText, path, retires);
      });
  }
  return waitForElementTextInternal(undesiredText, path, retries);
});


// New command will be called using cy.step('...')
//   and whatever is passed inside the function will
//   ultimately be the description of a step.
Cypress.Commands.add('step', (description) => {
  console.log(['step', description]);
  const MAX_ITEMS_IN_STACK = 20;
  let arr = Cypress.env('step') || [];
  arr.push(description);
  if (arr.length > MAX_ITEMS_IN_STACK) {
    arr.shift();
  }
  if (description == 'Start test') arr = [];
  Cypress.env('step', arr);
  return null;
});

Cypress.on(
  'uncaught:exception',
  (err, runnable) =>
    // returning false here prevents Cypress from
    // failing the test
    false,
);

Cypress.on('fail', (err, runnable) => {
  const customErrorMessage = createCustomErrorMessage(err, Cypress.env('step') || ['no steps provided...'], runnable);
  const customError = err;
  customError.message = customErrorMessage;
  throw customError;
});

const createCustomErrorMessage = (error, steps, runnableObj) => {
  let lastSteps = 'Last logged steps:\n';
  steps.map((step, index) => {
    lastSteps += `${index + 1}. ${step}\n`;
  });
  const messageArr = [
    `Context: ${runnableObj.parent.title}`,
    `Test: ${runnableObj.title}`,
    `----------`,
    `${error.message}`,
    `\n${lastSteps}`,
  ];

  // Return the new custom error message
  return messageArr.join('\n');
};

Cypress.Commands.add('saveLocalStorage', (currentUser: string) => {
  currentSession.user = currentUser;
  Cypress.log({
    message: 'Saving local storage and saving to variable.',
    displayName: 'SaveLocal',
  });
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Cypress.log({
    message: 'Grabbing local storage variable and setting.',
    displayName: 'SetLocal',
  });
  Object.keys(LOCAL_STORAGE).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE[key]);
  });
});

