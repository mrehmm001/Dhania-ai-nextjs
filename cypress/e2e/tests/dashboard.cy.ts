import { link } from "fs";

describe("Dashboard page", () => {
    beforeEach(()=>{
        cy.session('signed-in', () => {
            cy.signIn();
        });
        cy.visit("http://localhost:3000/dashboard",{
            failOnStatusCode:false
        });
    })
    it('Check dashboard',()=>{
        cy.log("Check to see if dashboard elements have been rendered")
        cy.get('[data-heading]').contains("Explore the power of Dhania");
        cy.get('[data-description]').contains("Query with Dhania - Experience the power of AI");
        cy.get('[data-item="Query"]').first().contains("Query");
        cy.get('[data-item="Data Ingestion"]').first().contains("Data Ingestion");
    });

    it('Check if side bar and navbar exists and functions',()=>{
        const options = ["Dashboard","Query","Data Ingestion","Settings"]
        cy.get('[data-sidebar]').as("sidebar");
        cy.get("@sidebar").should("be.visible");
        cy.get("@sidebar").children().should("have.length",2);
        options.forEach(option=>{
            cy.get("@sidebar").contains(option)
            .then((link)=>{
                cy.request(link.prop("href"));
            });
        })
        
        cy.log("Check on mobile view")
        cy.viewport('iphone-5');
        cy.get('[data-state="closed"]').click();
        cy.get("[data-navbar]").get("[data-sidebar]").as("navbar");
        cy.get("@navbar").should("be.visible");
        cy.get("@navbar").children().should("have.length.greaterThan",2);
        options.forEach(option=>{
            cy.get("@navbar").contains(option)
            .then((link)=>{
                cy.request(link.prop("href"));
            });
        })
        
        cy.log("reset back to normal view point");
        Cypress.config('viewportWidth')
    });
})