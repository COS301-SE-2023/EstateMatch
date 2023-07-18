describe('Login and Register Integration Test', () => {
  beforeEach(() => {
    cy.viewport(375, 812); //iPhone X size
    cy.visit('http://localhost:4200/login');
    cy.wait(3000); //wait 3 seconds for the page to load
  });

  it('user enters invalid username and password', () => {
    cy.get('ion-input[placeholder="Enter Username"]').type('InvalidUsername');
    cy.get('ion-input[placeholder="Password"]').type('InvalidPassword');
    cy.contains('ion-button', ' Login ').click();
    cy.wait(3000);
  });

  it('clicks Signup on the Login page', () => {
    cy.contains('ion-label', "Don't have an account ? Sign Up.").click();
    cy.wait(2000);

    cy.get('ion-input[placeholder="Enter First Name"]').type(
      'TestINTFirstName'
    );
    cy.get('ion-input[placeholder="Enter Last Name"]').type('TestINTLastName');
    cy.get('ion-input[placeholder="Enter Username"]').type('TestINTUsername');
    cy.get('ion-input[placeholder="Enter Email Address"]').type(
      'testINTemail@gmail.com'
    );
    cy.get('ion-input[placeholder="Enter Your Password"]').type(
      'TestINTPassword'
    );
    cy.get('ion-input[placeholder="Confirm Password"]').type('TestINTPassword');

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

  it('user enters the new username and password', () => {
    cy.get('ion-input[placeholder="Enter Username"]').type('TestINTUsername');
    cy.get('ion-input[placeholder="Password"]').type('TestINTPassword');
    cy.contains('ion-button', ' Login ').click();
    cy.wait(3000);
  });
});
