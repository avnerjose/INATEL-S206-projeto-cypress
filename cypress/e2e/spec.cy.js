/// <reference types="cypress"/>

describe("Criando cenários de teste para o site coffee-shop", () => {
  const website = "https://coffee-shop-avner.vercel.app";

  it("Caso de teste: Adicionando um produto no carrinho a partir da pagina de catalogo", () => {
    cy.visit(website);

    cy.get('[data-test="shop-here-button"]').click();
    cy.wait(1000);
    cy.get(":nth-child(1) > .items-center > .bg-brown-500").click();
    cy.get('[data-test="cart-link"] > .flex').should("contain.text", 1);
  });

  it("Caso de teste: Adicionando um produto no carrinho a partir da página de detalhe do produto", () => {
    cy.visit(website);

    cy.get('.hidden > [href="/catalog"]').click();
    cy.get('[href="/product/starbucks-costa-rica"]').click();
    cy.contains("Buy").click();
    cy.get('[data-test="cart-link"] > .flex').should("have.text", 1);
  });

  it("Caso de teste: Remover um produto do carrinho de compra", () => {
    cy.visit(website);
    cy.addToCart();

    cy.get('[data-test="cart-link"]').click();
    cy.get(":nth-child(6) > .cursor-pointer").click();
    cy.get(".gap-4 > .flex-col > .font-title").should(
      "contain.text",
      "Your cart is empty"
    );
    cy.get(".flex-col > .text-sm").should(
      "contain.text",
      "Looks like you have not added any products to your cart yet"
    );
  });

  it("Caso de teste: Preencher o formulário de informações do usuário", () => {
    cy.visit(website);

    cy.addToCart();
    cy.get('[data-test="cart-link"]').click();
    cy.get('[data-test="checkout-button"]').click();

    cy.wait(1000);
    cy.get('[data-test="first-name-input"]').type("Avner");
    cy.get('[data-test="last-name-input"]').type("José");
    cy.get('[data-test="phone-number-input"]').type("9999999999999");
    cy.get('[data-test="email-input"]').type("avner@email.com");
    cy.get(".justify-between > .bg-brown-500").click();
    cy.get('[data-test="street-input"]').should("exist");
  });

  it("Caso de teste: Preencher o formulário de informações do usuário com falha (faltando primeiro nome)", () => {
    cy.visit(website);

    cy.addToCart();
    cy.get('[data-test="cart-link"]').click();
    cy.get('[data-test="checkout-button"]').click();

    cy.wait(1000);
    cy.get('[data-test="first-name-input"]').type("Avner");
    cy.get('[data-test="first-name-input"]').clear();
    cy.get('[data-test="last-name-input"]').type("José");
    cy.get('[data-test="phone-number-input"]').type("9999999999999");
    cy.get('[data-test="email-input"]').type("avner@email.com");
    cy.get(".justify-between > .bg-brown-500").click();
    cy.get("form > :nth-child(1) > :nth-child(1) > .text-sm").should(
      "have.text",
      "First name is required"
    );
  });

  it("Caso de teste: Preencher o formulário de informações do usuário com falha (email inválido)", () => {
    cy.visit(website);

    cy.addToCart();
    cy.get('[data-test="cart-link"]').click();
    cy.get('[data-test="checkout-button"]').click();

    cy.wait(1000);
    cy.get('[data-test="first-name-input"]').type("Avner");
    cy.get('[data-test="last-name-input"]').type("José");
    cy.get('[data-test="phone-number-input"]').type("9999999999999");
    cy.get('[data-test="email-input"]').type("avner@.com");
    cy.get(".justify-between > .bg-brown-500").click();
    cy.get(":nth-child(2) > .text-sm").should("have.text", "Email is invalid");
  });
});
