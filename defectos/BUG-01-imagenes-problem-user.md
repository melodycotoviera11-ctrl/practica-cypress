# BUG-01 – Todos los productos muestran la misma imagen al iniciar sesión con problem_user

- **Aplicación:** Swag Labs (https://www.saucedemo.com)
- **Ambiente:** Windows, Chrome 156, Cypress 16.2.1, Node.js v26.13.0
- **Precondición:** usuario problem_user con contraseña secret_sauce.
- **Datos:** usuario problem_user / secret_sauce. Como referencia, standard_user / secret_sauce.

## Pasos

1. Abrir https://www.saucedemo.com.
2. Iniciar sesión con problem_user y secret_sauce.
3. Revisar las imágenes de los productos en la página de inventario.

- **Resultado esperado:** cada producto muestra su propia imagen, igual que con standard_user.
- **Resultado obtenido:** todos los productos muestran la misma imagen. El atributo src de las imágenes es igual en todos los productos.
- **Severidad:** Media. No impide comprar, pero el usuario no puede identificar los productos por su imagen.
- **Prioridad:** Media.
- **Prueba automatizada:** cypress/e2e/reto_problem_user.cy.js, prueba "BUG-01".
- **Evidencia:** captura de la ejecución de reto_problem_user.cy.js.
