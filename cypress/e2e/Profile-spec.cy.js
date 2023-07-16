describe('Profile Page Test', () => {
  beforeEach(() => {
    cy.viewport(375, 812); //iPhone X size
    cy.visit('http://localhost:4200/login');
    cy.get('ion-input[placeholder="Enter Username"]').type('TestUsername');
    cy.get('ion-input[placeholder="Password"]').type('TestPassword');
    cy.contains('ion-button', ' Login ').click();
    cy.contains('a', 'Profile').click();
    cy.wait(3000); //wait 3 seconds for the page to load
  });

  it('User edits preferences', () => {
    cy.contains('button', 'Edit').click();

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

  it('User updates profile', () => {
    cy.contains('ion-button', 'Edit Profile Information').click();

    cy.get('ion-input[placeholder="First Name"]').type('TestFirstName');
    cy.get('ion-input[placeholder="Last Name"]').type('TestLastName');
    cy.get('ion-input[placeholder="Username"]').type('TestUsername');
    cy.get('ion-input[placeholder="Email"]').type('testemail@gmail.com');
    cy.wait(3000);
    cy.contains('button', 'Edit Profile').click();
    cy.wait(3000);cy.wait(3000);
  });

  it('User goes back to profile page from edit profile', () => {
    cy.contains('ion-button', 'Edit Profile Information').click();
    cy.wait(3000);
    cy.contains('button', 'Back to Profile').click();
    cy.wait(3000);
  });

  it('User logs out', () => {
    cy.contains('ion-button', 'Log Out').click();
    cy.wait(3000);
  });
});
