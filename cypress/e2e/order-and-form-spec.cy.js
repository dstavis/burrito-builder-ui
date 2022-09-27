describe('orders and new order submission', () => {
  const ordersURL = "http://localhost:3001/api/v1/orders"

  beforeEach( () => {
    cy.intercept("GET", ordersURL, { fixture: "orders"})
    cy.intercept("POST", ordersURL, { fixture: "newOrder"})
  })

  it('the form appears when the page loads', () => {
    cy.visit('http://localhost:3000')
    cy.get("form").should("exist")
  })

  it('there are three orders when the page loads', () => {
    cy.get("div.order").should("have.length", "3")
  })


  it('the user cannot submit the form without a name or ingredient', () => {
    cy.get("button.submit").click()
    cy.get("form").submit()
    cy.get("div.order").should("have.length", "3")
    cy.get(".error-message").should("exist")
  })
  
  it('when the user types, the name field fills in', () => {
    cy.get('input').first().type("John Doe").should("have.attr", "value", "John Doe")
  })
  
  it('the user cannot submit the form with a name but no ingredient', () => {
    cy.get("button.submit").click()
    cy.get("form").submit()
    // test that the number of orders hasn't changed, and the inputs are the same (that's how we know the form hasn't submitted)
    cy.get("div.order").should("have.length", "3")
    cy.get("input").should("have.attr", "value", "John Doe")
  })

  it('when the user clicks an ingredient button, the ingredient name displays', () => {
    cy.get("button.ingredient-button").first().click()
    cy.get("header p").first().should("contain", "Order: beans")
  })

  it('when the user clicks more ingredient buttons, all the ingredient names display', () => {
    cy.get("button.ingredient-button").first().next().click().next().next().click()
    cy.get("header p").first().should("contain", "Order: beans, steak, sofritas")
  })

  it("when the form is submittable, the error message doesn't show and the button looks clickable", () => {
    cy.get("button.submit").should("not.have.class", ".invalid")
    cy.get(".error-message").should("not.exist")
    // cy.get("header p").first().should("contain", "Order: beans, steak, sofritas")
  })

  it('the user cannot submit the form without a name even with ingredients', () => {
    // empty the name input
    cy.get('input').first().clear()
    cy.get("button.submit").click()
    cy.get("form").submit()
    // test that the number of orders hasn't changed, and the inputs are the same (that's how we know the form hasn't submitted)
    cy.get("div.order").should("have.length", "3")
    cy.get("header p").first().should("contain", "Order: beans, steak, sofritas")
  })

  it('when a complete form is submitted, the new order is added to the page', () => {
    cy.get('input').first().type("John Doe")
    cy.get("button.submit").click()
    cy.get("div.order").should("have.length", "4")
      .last().should("contain", "John Doe")
      .and("contain", "steak")
      .and("contain", "beans")
      .and("contain", "sofritas")
  })

})

