describe('Register Page Test', () => {
    beforeEach(() => {
        cy.viewport(375, 812) //iPhone X size
        cy.visit('http://localhost:4200/register')
    })

    it('enter all details needed to register', () => {
        cy.get('ion-input[placeholder="Enter First Name"]').type('TestFirstName');
        cy.get('ion-input[placeholder="Enter Last Name"]').type('TestLastName');
        cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
        cy.get('ion-input[placeholder="Enter Email Address"]').type('testemail@gmail.com');
        cy.get('ion-input[placeholder="Enter Your Password"]').type('TestPassword');
        cy.get('ion-input[placeholder="Confirm Password"]').type('TestPassword');

    })

    
    it('check if the password and confirmed password are the same', () => {
        

    })  

    it('registers a new user', () => {

    })

});