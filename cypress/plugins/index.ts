/// <reference types="cypress" />
// will resolve to "cypress/support/index.d.ts"
/// <reference types="../support" />
import { backend } from './backend';
import { Common } from './common/common';

/**
 * @type {Cypress.PluginConfig}
 */
 const common = new Common();

const back = new backend(common);

module.exports = (on: any, config: any) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', back.getCypressTask());
};


