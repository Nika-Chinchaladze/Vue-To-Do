/// <reference types="Cypress" />

describe("Cancel button functionality", () => {
    it("should clean input fields and set Add as a name of submit button", () => {
        // Arrange & Mocking
        cy.intercept("GET", "http://localhost:5000/books", { fixture: "books.json" }).as("getBooks");
        cy.visit("/");
        // Act
        cy.get('[data-cy="submit-btn"]').should("contain.text", "Add");
        cy.get('[data-cy="book-content"] li').first().as("firstBook");
        cy.get("@firstBook").find(".edit-btn").click();
        cy.get('[data-cy="submit-btn"]').should("contain.text", "Update");
        cy.get("#cancel-btn").should("contain.text", "Cancel").click();
        // Assert
        cy.get('[data-cy="title-input"]').should("be.empty");
        cy.get('[data-cy="author-input"]').should("be.empty");
        cy.get('[data-cy="image-input"]').should("be.empty");
        cy.get('[data-cy="price-input"]').should("be.empty");
        cy.get('[data-cy="submit-btn"]').should("contain.text", "Add");
    });
});
