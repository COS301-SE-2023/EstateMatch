describe('Search Page Test', () => {
  beforeEach(() => {
    cy.viewport(375, 812); //iPhone X size
    cy.visit('http://localhost:4200/login');
    cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
    cy.get('ion-input[placeholder="Password"]').type('TestPassword');
    cy.contains('ion-button', ' Login ').click();
    cy.wait(3000); //wait 3 seconds for the page to load
    cy.contains('a', 'Search').click();
    cy.wait(3000); //wait 3 seconds for the page to load
  });

  it('User searches for a property', () => {
    cy.get('ion-searchbar[name="searchBar"]').type('Ballito');
    cy.get('button[name="filter-button"]').click();
    cy.get('select[_ngcontent-ng-c3162222661]').eq(0).select('5 500 000');
    cy.get('select[_ngcontent-ng-c3162222661]').eq(1).select('7 500 000');
    cy.wait(2000);

    cy.get('button[name="Save"]').click();
    cy.wait(3000);

    cy.get('button[id="like-button"]').click();

    cy.wait(3000); //wait 3 seconds for the page to load
    cy.get('button[id="dislike-button"]').click();


  });
});
