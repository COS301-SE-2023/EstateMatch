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
        cy.get('ion-searchbar[name="searchBar"]').type('Cape Town');
        
      });
});