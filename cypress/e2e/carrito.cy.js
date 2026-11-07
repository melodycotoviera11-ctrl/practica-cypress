describe('Carrito de compras', () => {
  beforeEach(() => {
    cy.login()
  })

  it('CP-05: agrega un producto y el carrito muestra 1', () => {
    // Estado inicial: el carrito está vacío
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')
  })
    it('CP-08: quita un producto del carrito y el contador baja a 1', () => {
    // Estado inicial: el carrito está vacío
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')

    // Agregar dos productos
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')

    // Quitar uno de ellos
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()

    // El contador baja a 1 y el botón del producto quitado vuelve a "Add to cart"
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible')

    // En el carrito solo queda el producto que no se quitó
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')
    cy.get('[data-test="inventory-item"]').should('have.length', 1)
    cy.get('[data-test="inventory-item-name"]').should('have.text', 'Sauce Labs Bike Light')
  })
})