describe('Login Page Test', () => {
  beforeEach(() => {
    cy.viewport(375, 812); //iPhone X size
    cy.visit('http://localhost:4200/login');
    cy.wait(3000); //wait 3 seconds for the page to load
  });

  it('user enters valid username and password', () => {
    cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
    cy.get('ion-input[placeholder="Password"]').type('TestPassword');
    cy.contains('ion-button', ' Login ').click();
    cy.wait(3000);
  });

  it('user enters invalid username and password', () => {
    cy.get('ion-input[placeholder="Enter Username"]').type('InvalidUsername');
    cy.get('ion-input[placeholder="Password"]').type('InvalidPassword');
    cy.contains('ion-button', ' Login ').click();
    cy.wait(3000);
  });

  // it('clicks Signup on the Login page', () => {
  //   cy.contains('ion-label', "Don't have an account ? Sign Up.").click();

  //   cy.get('ion-input[placeholder="Enter First Name"]').type('TestFirstName');
  //   cy.get('ion-input[placeholder="Enter Last Name"]').type('TestLastName');
  //   cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
  //   cy.get('ion-input[placeholder="Enter Email Address"]').type(
  //     'testemail@gmail.com'
  //   );
  //   cy.get('ion-input[placeholder="Enter Your Password"]').type('TestPassword');
  //   cy.get('ion-input[placeholder="Confirm Password"]').type('TestPassword');

  //   cy.contains('ion-button', ' Create Account ').click();
  //   cy.wait(3000);
  // });
});
