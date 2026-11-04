
describe('Cierre de sesión de Swag Labs', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
  })

  it('CP-10: cierra sesión correctamente', () => {

    // Abrir el menú lateral
    cy.get('#react-burger-menu-btn').click()

    // Hacer clic en Logout
    cy.get('[data-test="logout-sidebar-link"]')
      .should('be.visible')
      .click()

    // Verificar que regresa al login
    cy.url().should('not.include', '/inventory.html')
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('[data-test="login-button"]').should('be.visible')

  })
})