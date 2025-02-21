/// <reference types="cypress" />
class Subscribers {
  constructor() {
    // Locators

    this.filterDropdown = '[data-test-id="dropdown-button"]';
    this.filterListItem = '[data-test-id="dropdown-list-item"]';
    this.subscribersContainer = '#subscribers';
    this.defaultTimeout = 8000;
  }
  filterByUnsubscribed() {
    cy.get(this.filterDropdown, { timeout: this.defaultTimeout })
      .should('be.visible')
      .click();
    cy.get(this.filterListItem, { timeout: this.defaultTimeout })
      .eq(1)
      .should('be.visible')
      .click();
  }

  verifyUnsubscribedUser(email, reason) {
    cy.get(this.subscribersContainer, { timeout: this.defaultTimeout })
      .should('be.visible')
      .contains(email)
      .scrollIntoView()
      .trigger('mouseover')
      .parents('tr')
      .within(() => {
        cy.get('td').last().scrollIntoView().should('contain.text', reason);
      });
  }
}

export default Subscribers;
