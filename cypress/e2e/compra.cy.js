describe('Compra en Swag Labs', () => {
  beforeEach(() => {
    cy.login()
  })

  it('CP-06: completa una compra de principio a fin', () => {
    // 1. Agregar un producto
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')

    // 2. Ir al carrito y verificar el producto
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')
    cy.get('[data-test="inventory-item-name"]')
      .should('contain', 'Sauce Labs Backpack')

    // 3. Checkout: datos del cliente
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')
    cy.get('[data-test="firstName"]').type('Pamela')
    cy.get('[data-test="lastName"]').type('Cruz')
    cy.get('[data-test="postalCode"]').type('30101')
    cy.get('[data-test="continue"]').click()

    // 4. Resumen de la compra
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('[data-test="inventory-item-name"]')
      .should('contain', 'Sauce Labs Backpack')
    cy.get('[data-test="total-label"]').should('be.visible')

    // 5. Finalizar
    cy.get('[data-test="finish"]').click()

    // 6. Confirmación
    cy.url().should('include', '/checkout-complete.html')
    cy.get('[data-test="complete-header"]')
      .should('be.visible')
      .and('contain', 'Thank you for your order')
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
  })
})