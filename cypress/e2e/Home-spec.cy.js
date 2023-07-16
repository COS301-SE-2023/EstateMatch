describe('Home Page Test', () => {
  beforeEach(() => {
    cy.viewport(375, 812); //iPhone X size
    cy.visit('http://localhost:4200/login');
    cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
    cy.get('ion-input[placeholder="Password"]').type('TestPassword');
    cy.contains('ion-button', ' Login ').click();
    cy.wait(3000); //wait 3 seconds for the page to load
  });

  it('User likes and dislikes a property', () => {
    // cy.viewport(375, 667) //iPhone X size
    // cy.visit('http://localhost:4200/login')
    // cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
    // cy.get('ion-input[placeholder="Password"]').type('TestPassword');
    // cy.contains('ion-button', ' Login ').click();

    //cy.wait(3000); //wait 3 seconds for the page to load
    cy.get('button[id="like-button"]').click();

    cy.wait(3000); //wait 3 seconds for the page to load
    cy.get('button[id="dislike-button"]').click();
  });
});
