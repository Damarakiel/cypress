describe('Common landing pages tests', () => {

    it('Redirection to packages main page', () => {
        const baseUrl = String(Cypress.config('baseUrl'));

        cy.visit(baseUrl);
        cy.location().should((location) => {
            expect(location.href).to.eq(baseUrl.replace('-', '+'))
        });
    })
    
})
