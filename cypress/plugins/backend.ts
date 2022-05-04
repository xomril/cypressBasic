/* eslint-disable cypress/no-unnecessary-waiting */
import { Common } from './common/common';
import { WebCommon } from './common/webCommon';

const commands = new WebCommon();

export class backend {
  constructor(private common: Common) {
  }
  
  getCypressTask() {
    return {
    };
  }

}

