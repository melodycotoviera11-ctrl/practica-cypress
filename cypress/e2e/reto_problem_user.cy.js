// Reto opcional: detectar un defecto intencional de problem_user.
// Defecto: en la página de inventario todos los productos muestran la misma imagen.
// La primera prueba deja registrado el comportamiento correcto con standard_user
// y la segunda confirma que con problem_user las imágenes se repiten.

const obtenerImagenes = () =>
  cy.get('[data-test="inventory-item"] img').then(($imgs) =>
    [...$imgs].map((img) => img.getAttribute('src'))
  )

describe('Reto: defecto de imágenes con problem_user', () => {
  it('Referencia: con standard_user cada producto tiene su propia imagen', () => {
    cy.login()

    obtenerImagenes().then((imagenes) => {
      expect(imagenes.length).to.be.greaterThan(1)
      expect(new Set(imagenes).size).to.equal(imagenes.length)
    })
  })

  it('BUG-01: con problem_user todos los productos muestran la misma imagen', () => {
    cy.login('problem_user', 'secret_sauce')

    obtenerImagenes().then((imagenes) => {
      expect(imagenes.length).to.be.greaterThan(1)
      // Se detecta el defecto: hay varios productos pero una sola imagen distinta
      expect(new Set(imagenes).size).to.equal(1)
    })
  })
})
