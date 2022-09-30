// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
<<<<<<< HEAD
    cy.contains('ion-content', 'Tab 1 page')
=======
    cy.contains('#container', 'Ready to create an app?')
>>>>>>> 760e81a (Initial commit)
  })
})
