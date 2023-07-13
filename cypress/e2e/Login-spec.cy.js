describe('My First Test', () => {
  it('clicks Signup on the Login page', () => {
    cy.viewport(375, 812) //iPhone X size
    cy.visit('http://localhost:4200/login')

    cy.contains('ion-label', 'Don\'t have an account ? Sign Up.').click()
  })
});