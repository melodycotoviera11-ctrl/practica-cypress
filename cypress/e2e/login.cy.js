describe('Login de Swag Labs', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  
  it('CP-01: inicia sesión con un usuario válido', () => {
    cy.fixture('usuarios').then(({ valido }) => {
     cy.get('[data-test="username"]').type(valido.username)
     cy.get('[data-test="password"]').type(valido.password)
    })

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

  
  it('CP-03: muestra error con contraseña incorrecta', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('clave_incorrecta')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'do not match any user')

    cy.url().should('not.include', '/inventory.html')
  })

  
  it('CP-04: muestra error si el usuario está vacío', () => {
    cy.get('[data-test="username"]').should('have.value', '')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username is required')

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