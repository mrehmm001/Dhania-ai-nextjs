describe("Data ingestion page", () => {
    beforeEach(()=>{
        cy.session('signed-in', () => {
            cy.signIn();
        });
    })
    it('Check data ingestion',()=>{
        cy.visit("http://localhost:3000/data",{
            failOnStatusCode:false
        });

        cy.log("Check to see if data ingestion elements have been rendered")
        cy.get('[data-heading]').contains("Data Ingestion");
        cy.get('[data-description]').contains("View your data sources here");
        cy.get('[data-input="search"]').should("be.visible");
        cy.get('[data-table]').should("be.visible");
        cy.get('[data-header]').should("be.visible");
        cy.get('[data-button="new"]').should("be.visible").as("addNew");
        cy.intercept({
            method:"GET",
            url:"http://localhost:3000/data/new-data?_rsc=b8uup",
        }).as("request");
        cy.get('@addNew').click();
        cy.wait("@request").then((interception)=>{
            expect(interception.response!.statusCode).to.eq(200);
        });
 
    });

    it('Test Add new data',()=>{
        cy.visit("http://localhost:3000/data/new-data",{
            failOnStatusCode:false
        });

        cy.log("Check to see if new data elements have been rendered")
        cy.get('[data-heading]').contains("Add your data here");
        cy.get('[data-description]').contains("Insert your data here");
        cy.get('[data-input="file"]').should("be.visible").as("fileInput");
        cy.get('[data-input="submit"]').should("be.visible").as("submit");
        const filename = "menu.pdf";
        cy.readFile("./cypress/data/sample-pizza-menu.pdf", null).then((file) => {
            cy.get("@fileInput").selectFile({
                contents: Cypress.Buffer.isBuffer(file),
                fileName: filename,
                lastModified: Date.now(),
            })
            cy.get("@submit").click();
        });
        cy.visit("http://localhost:3000/data",{
            failOnStatusCode:false
        });
        cy.get(`[data-item="${filename}"]`).should("be.visible").as("menuItem");
        cy.get("@menuItem").get('[data-button="delete"]').should("be.visible").click();
        cy.get("@menuItem").should("not.exist");
    });
})