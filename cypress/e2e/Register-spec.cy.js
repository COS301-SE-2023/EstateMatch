describe('Register Page Test', () => {
    beforeEach(() => {
        cy.viewport(375, 667) //iPhone X size
        cy.visit('http://localhost:4200/register')
    })

    it('enter all details needed to register a user', () => {
        cy.get('ion-input[placeholder="Enter First Name"]').type('TestFirstName');
        cy.get('ion-input[placeholder="Enter Last Name"]').type('TestLastName');
        cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
        cy.get('ion-input[placeholder="Enter Email Address"]').type('testemail@gmail.com');
        cy.get('ion-input[placeholder="Enter Your Password"]').type('TestPassword');
        cy.get('ion-input[placeholder="Confirm Password"]').type('TestPassword');

        cy.contains('ion-button', ' Create Account ').click()
    })

    //cy.visit('http://localhost:4200/preference')
});