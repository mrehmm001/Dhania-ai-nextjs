describe("Query page", () => {
    beforeEach(()=>{
        cy.session('signed-in', () => {
            cy.signIn();
        });
    })

    it('Add data and then query it',()=>{
        cy.visit("http://localhost:3000/data/new-data",{
            failOnStatusCode:false
        });
        const filename = "menu.pdf";
        cy.get('[data-input="file"]').should("be.visible").as("fileInput");
        cy.get('[data-input="submit"]').should("be.visible").as("submit");
        cy.readFile("./cypress/data/sample-pizza-menu.pdf", null).then((file) => {
            cy.get("@fileInput").selectFile({
                contents: Cypress.Buffer.isBuffer(file),
                fileName: filename,
                lastModified: Date.now(),
            })
            cy.get("@submit").click();
        });
        cy.visit("http://localhost:3000/query",{
            failOnStatusCode:false
        });
        cy.get(`[data-input="query"]`).should("be.visible").as("input");
        cy.get("@input").type("This is a test, please reply 'Hello' and nothing else, {enter}");
    });
})