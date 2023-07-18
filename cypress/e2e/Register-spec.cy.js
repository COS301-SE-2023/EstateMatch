describe('Register Page Test', () => {
  beforeEach(() => {
    cy.viewport(375, 667); //iPhone X size
    cy.visit('http://localhost:4200/login');
  });

  it('enter all details needed to register a user', () => {
    cy.contains('ion-label', "Don't have an account ? Sign Up.").click();

    cy.get('ion-input[placeholder="Enter First Name"]').type('TestFirstName');
    cy.get('ion-input[placeholder="Enter Last Name"]').type('TestLastName');
    cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
    cy.get('ion-input[placeholder="Enter Email Address"]').type(
      'testemail@gmail.com'
    );
    cy.get('ion-input[placeholder="Enter Your Password"]').type('TestPassword');
    cy.get('ion-input[placeholder="Confirm Password"]').type('TestPassword');

    //NOTE: since this test has been run the registration will fail as the username already exists
    cy.contains('ion-button', ' Create Account ').click();
    cy.wait(3000);

    cy.get('ion-input[placeholder="Enter area here"]').type('Woodstock');
    cy.get('select[label="Budget"]').select('1 450 000');
    cy.get('select[label="Bedrooms"]').select('2');
    cy.get('select[label="Bathrooms"]').select('4');
    cy.get('select[label="Garage"]').select('2');
    cy.get('ion-input[label="Extra: "]').type('Pool');

    cy.wait(2000);
    cy.contains('button', 'Set Preferences').click();
    cy.wait(3000);
  });
});
