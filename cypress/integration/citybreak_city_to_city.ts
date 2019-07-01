describe('City Break - city to city', () => {
    
    beforeEach(() => {
        cy.server()
        cy.viewport('iphone-6')
    })

    it('Visits KTW - BCN city break landing page', () => {
        cy.visit(Cypress.config('baseUrl')+'/ci-ktw/ci-bcn')
    })

    it('Verifies heading', () => {
        cy.get('div h1').contains('Barcelona City Break - Wylot z Katowic')
    })

    it('Verifies offers available', () => {
        cy.get('a[data-qa-offer]').should('exist')
    })

    it('Verifies more offers button exists', () => {
        cy.get('a[data-qa-offers-show-more]').contains('Zobacz pozostałe oferty')
    })

    it('Verifies search results are loading properly', () => {
        cy.route('POST', 'eapi', 'fixture:dynamicPackagesResults.json')

        cy.get('li:nth-child(1) a[data-qa-offer]').click()
        cy.get('package-selected', {timeout: 30000}).should('exist')
    })
})