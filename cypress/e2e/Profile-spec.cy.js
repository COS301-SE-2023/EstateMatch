describe('Profile Page Test', () => {
    beforeEach(() => {
        cy.viewport(375, 812); //iPhone X size
        cy.visit('http://localhost:4200/login');
        cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
        cy.get('ion-input[placeholder="Password"]').type('TestPassword');
        cy.contains('ion-button', ' Login ').click();
        cy.wait(3000); //wait 3 seconds for the page to load

        cy.contains('a', 'Profile').click();
      });

    it('User updates profile', () => {
        cy.contains('ion-button', 'Edit Profile Information').click();

        cy.get('ion-input[placeholder="First Name"]').type('TestFirstName');
        cy.get('ion-input[placeholder="Last Name"]').type('TestLastName');
        cy.get('ion-input[placeholder="Username"]').type('TestUsername');
        cy.get('ion-input[placeholder="Email"]').type('testemail@gmail.com');

        cy.contains('button', 'Edit Profile').click();
        cy.wait(3000);

    });

    // it('User edits preferences', () => {
    //     cy.contains('button', 'Edit').click();
    //     cy.wait(2000);

    //     cy.get('ion-input[placeholder="Enter area here"]').type('Woodstock');
    //     cy.get('select').select('1 450 000');


    // });

    it('User goes back to profile page from edit profile', () => {
        cy.contains('ion-button', 'Edit Profile Information').click();
        cy.wait(3000);
        cy.contains('button', 'Back to Profile').click();
        cy.wait(3000);

    });

    it('User logs out', () => {
        cy.contains('ion-button', 'Log Out').click();
    });

});