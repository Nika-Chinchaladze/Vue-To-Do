/// <reference types="Cypress" />

describe("updateBook()", () => {
    it("should update last book successfully", () => {
        // Arrange
        cy.intercept("GET", "http://localhost:5000/books", { fixture: "books.json" }).as("getBooks");
        cy.visit("/");
        cy.intercept("PUT", "http://localhost:5000/books/3", {
            statusCode: 201,
            body: {
                message: "Book has been updated successfully",
            }
        }).as("updateBook");
        
        // Act
        cy.get('[data-cy="book-content"] li').last().as("lastBook");
        cy.get("@lastBook").find(".edit-btn").click();

        cy.get('[data-cy="author-input"]').click();
        cy.get('[data-cy="author-input"]').type("Max Holloway");

        cy.get('[data-cy="submit-btn"]').should("contain.text", "Update").click();

        // Assert
        cy.wait("@updateBook").then((result) => {
            expect(result.response.statusCode).to.eq(201);
            expect(result.response.body.message).to.eq("Book has been updated successfully");
        });
    });

    it("should display correct data into input fields after clicking edit button", () => {
        // Arrange & Mocking
        cy.intercept("GET", "http://localhost:5000/books", { fixture: "books.json" }).as("getBooks");
        cy.visit("/");

        cy.get('[data-cy="book-content"] li').last().as("lastBook");

        // Act
        cy.get("@lastBook").find(".edit-btn").click();

        // // Assert
        cy.get("@lastBook").find(".p-title").then((element) => {
            const title = element.text();
            cy.get('[data-cy="title-input"]').then((result) => {
                expect(result.val()).contain(title);
            });
        });

        cy.get("@lastBook").find(".p-author").then((element) => {
            const author = element.text();
            cy.get('[data-cy="author-input"]').then((result) => {
                expect(result.val()).contain(author);
            });
        });

        cy.get("@lastBook").find(".p-price").then((element) => {
            const price = element.text();
            cy.get('[data-cy="price-input"]').then((result) => {
                expect(result.val()).contain(price);
            });
        });
    });

    it("shouldn't update selected book due to network error", () => {
        // Arrange & Mocking
        cy.intercept("GET", "http://localhost:5000/books", { fixture: "books.json" }).as("getBooks");
        cy.visit("/");
        cy.intercept("PUT", "http://localhost:5000/books/3", { forceNetworkError: true }).as("updateBook");

        // Act
        cy.get('[data-cy="book-content"] li').last().as("lastBook");
        cy.get("@lastBook").find(".edit-btn").click();

        cy.get('[data-cy="author-input"]').click();
        cy.get('[data-cy="author-input"]').type("Max Holloway");

        cy.get('[data-cy="submit-btn"]').should("contain.text", "Update").click();

        // Assert
        cy.wait("@updateBook").its("error").should("not.be.undefined");
        cy.get("@lastBook").should("contain.text", "John");
    });
});
