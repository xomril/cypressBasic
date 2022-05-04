import basePage from './basePage';

class MainPage extends basePage {
  baseURL: string;
 

  constructor() {
    super('https://atid.store/');
  }
}

const mainPage = new MainPage();
export default mainPage;
