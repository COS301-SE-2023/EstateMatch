describe('Home Page Test', () => {
    it('User likes and dislikes a property', () => {
        cy.viewport(375, 667) //iPhone X size
        cy.visit('http://localhost:4200/login')
        cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
        cy.get('ion-input[placeholder="Password"]').type('TestPassword');
        cy.contains('ion-button', ' Login ').click();


        cy.wait(5000); //wait 5 seconds for the page to load
        cy.get('button[id="like-button"]').click();

        cy.wait(5000); //wait 5 seconds for the page to load
        cy.get('button[id="dislike-button"]').click();

    });


    
});