describe('Login de Swag Labs', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('CP-01: inicia sesión con un usuario válido', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
    cy.get('[data-test="title"]').should('have.text', 'Products')
  })

  it('CP-02: muestra error con usuario bloqueado', () => {
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'locked out')
    cy.url().should('not.include', '/inventory.html')
  })

  it('CP-07: muestra error si la contraseña está vacía', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').should('have.value', '')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Password is required')
    cy.url().should('not.include', '/inventory.html')
  })
})