// ***********************************************
// Comandos personalizados de Cypress
// https://on.cypress.io/custom-commands
// ***********************************************

// cy.login(): inicia sesión en Swag Labs y confirma que se llegó al inventario.
// Sin parámetros usa standard_user / secret_sauce; también acepta otro usuario,
// por ejemplo cy.login('problem_user', 'secret_sauce').
Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
  cy.visit('/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
  cy.url().should('include', '/inventory.html')
})