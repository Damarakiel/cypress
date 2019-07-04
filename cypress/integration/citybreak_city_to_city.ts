describe('City Break - city to city with offers', () => {
    
    beforeEach(() => {
        cy.server()
        cy.viewport('iphone-6')
    })

    it('Visits KTW - MIL city break landing page', () => {
        cy.visit(Cypress.config('baseUrl')+'/ci-ktw/ci-mil')
    })

    it('Verifies heading', () => {
        cy.get('div h1').contains('Mediolan City Break - Wylot z Katowic')
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

describe('City Break - city to city without offers', () => {
    
    beforeEach(() => {
        cy.server()
        cy.viewport('iphone-6')
    })

    it('Visits KTW - BCN city break landing page', () => {
        cy.visit(Cypress.config('baseUrl')+'/ci-waw/ci-bcn')
    })

    it('Verifies heading', () => {
        cy.get('div h1').contains('Barcelona City Break - Wylot z Warszawy')
    })

    it('Verifies offers are not available', () => {
        cy.get('a[data-qa-offer]').should('not.exist')
        cy.get('div[data-qa-offers-teaser]').should('exist')
    })

    it('Verifies no offer description', () => {
        cy.get('span[data-qa-offers-teaser-destination]').contains('Barcelona')
        cy.get('span[data-qa-offers-teaser-title]').contains('zobacz ofertę najlepszych hoteli')
    })

    it('Verifies check offers button exists', () => {
        cy.get('a[data-qa-offers-teaser-link]').should('exist')
    })

    it('Verifies search results are loading properly', () => {
        cy.get('a[data-qa-offers-teaser-link]').click()
        cy.get('.results .offers', {timeout: 30000}).should('exist')
    })
})