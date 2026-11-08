describe('Ordenamiento de productos en Swag Labs', () => {
  beforeEach(() => {
    cy.login()
  })

  const obtenerPrecios = () =>
    cy.get('[data-test="inventory-item-price"]').then(($precios) =>
      [...$precios].map((el) => parseFloat(el.innerText.replace('$', '')))
    )

  it('CP-09: ordena los productos por precio de menor a mayor', () => {
    cy.get('[data-test="product-sort-container"]').select('lohi')

    obtenerPrecios().then((precios) => {
      const esperado = [...precios].sort((a, b) => a - b)
      expect(precios).to.deep.equal(esperado)
      expect(precios[0]).to.be.lessThan(precios[precios.length - 1])
    })
  })

  it('CP-09: ordena los productos por precio de mayor a menor', () => {
    cy.get('[data-test="product-sort-container"]').select('hilo')

    obtenerPrecios().then((precios) => {
      const esperado = [...precios].sort((a, b) => b - a)
      expect(precios).to.deep.equal(esperado)
      expect(precios[0]).to.be.greaterThan(precios[precios.length - 1])
    })
  })
})