
import main from '../pages/mainPage';


const pageTest = (): void => {
  it(`Should load main Page`, () => {
    main.load();
    main.ShopBtn.should('exist').click();
    main.FilterInput.should('exist');
  });
};

export { pageTest };
