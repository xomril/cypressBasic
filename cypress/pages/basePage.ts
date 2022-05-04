
export default class BasePage {
  baseURL: string;
  shopBtn: string;
  filerInput: string;

  constructor(url: string) {
    this.baseURL = `${url}`;
    this.shopBtn = '.elementor-element-78ab79a > .elementor-widget-container > .elementor-button-wrapper > .elementor-button-link';
    this.filerInput = '#wc-block-search__input-1'
  }

  get ShopBtn(){
    return cy.get(this.shopBtn)
  }

  get FilterInput(){
    return cy.get(this.filerInput)
  }

  load(path: string = ''): void {
    cy.visit(`${this.baseURL}/${path}`);
  }


}
