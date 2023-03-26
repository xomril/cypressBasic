import { pageTest } from '../../tests_modules/mainPage';

describe('End to End test (basic signup flow)', () => {
  before(() => {
    cy.viewport(1920, 1080);
  });

  beforeEach(() => {
    //we can use test title as a uniqe id so we could update its status
    //cy.log(Cypress.mocha.getRunner().suite.ctx.currentTest.title)
  });
  pageTest();
});
