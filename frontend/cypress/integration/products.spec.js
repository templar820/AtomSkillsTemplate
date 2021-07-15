const productsCount = 48;

describe('Products', () => {
  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('Я могу просматривать продукты', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
    cy.get('.product-card').should('have.length', productsCount);
    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(500);
    cy.get('.product-card').should('have.length', productsCount * 2);
    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(500);
    cy.get('.product-card').should('have.length', productsCount * 3);
  });

  it('Я могу добавить продукт', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(2000);
  });

  after(() => {
    cy.logout();
  })
});