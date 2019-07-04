describe('City Break - city to city', () => {

    it('Visits grouped city break landing page', () => {
        cy.viewport('iphone-6')
        cy.visit(Cypress.config('baseUrl')+'/citybreak')
    })
    
}) 