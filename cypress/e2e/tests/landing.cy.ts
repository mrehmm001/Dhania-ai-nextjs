describe("Landing page", () => {
    beforeEach(()=>{
        cy.visit("http://localhost:3000/",{
            failOnStatusCode:false
        });
    })
    it('Visit Dhania',()=>{
        cy.get("[data-logo]").should("be.visible").contains("Dhania.Ai");
        cy.get('[data-link="api"]').should("be.visible").contains("API");
        cy.get('[data-link="dashboard"]').should("be.visible").contains("Account");

        cy.get('[data-heading="discover"]').should("be.visible").contains("Discover with Dhania:");
        cy.get('[data-heading="revolutionary"]').should("be.visible").contains("Revolutionary AI-Powered Search for:");
        cy.get('[data-heading="start-now"]').should("be.visible").contains("Start now for free");
    });

    it('Login page',()=>{
        cy.get('[data-link="dashboard"]').should("be.visible").contains("Account").click();
        cy.intercept("GET",'/sign-in').as("signIn");
        cy.get('[data-localization-key]').contains("Sign in");
    });
})