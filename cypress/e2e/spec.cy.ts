describe("basic functionalities", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("no empty search", () => {
    cy.get("#search-btn").click();

    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.get("#warning-message").should(
      "contain.text",
      "Search field cannot be empty"
    );
  });

  it("no same languages search", () => {
    cy.get("#search-box").click().type("the godfather");

    cy.get("#source-lang")
      .parent()
      .click()
      .get('ul > li[data-value="en-US"]')
      .click();

    cy.get("#dest-lang")
      .parent()
      .click()
      .get('ul > li[data-value="en-US"]')
      .click();

    cy.get("#search-btn").click();

    cy.get("#warning-message").should(
      "contain.text",
      "Idioms must be different"
    );
  });

  it("swap source and translation idioms", () => {
    cy.get("#source-lang")
      .parent()
      .click()
      .get('ul > li[data-value="en-US"]')
      .click();

    cy.get("#dest-lang")
      .parent()
      .click()
      .get('ul > li[data-value="pt-BR"]')
      .click();

    cy.get("#swap-btn").click();

    cy.get("#source-lang").contains("Portuguese (BR)");
    cy.get("#dest-lang").contains("English");
  });

  it("search by pressing enter", () => {
    cy.get("#search-box").click().type("the godfather{enter}");

    cy.get("#movie-cards-list").should("contain.text", "The Godfather");
  });

  it("verify movie title translation", () => {
    cy.get("#source-lang")
      .parent()
      .click()
      .get('ul > li[data-value="en-US"]')
      .click();

    cy.get("#dest-lang")
      .parent()
      .click()
      .get('ul > li[data-value="pt-BR"]')
      .click();

    cy.get("#search-box").click().type("the godfather{enter}");

    cy.get(".MuiCardContent-root")
      .contains("button", "See Translation")
      .first()
      .click();

    cy.get(".MuiDialog-paper").should("contain.text", "O Poderoso Chefão");
  });
});

export {};
