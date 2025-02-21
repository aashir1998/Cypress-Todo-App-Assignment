/// <reference types="cypress" />
class Sidebar {
  constructor() {
    // Locators

    this.sideBar = '[data-test-id="sidebar-navigation"]';
    this.defaultTimeout = 5000;
  }

  visitCampaignsTab() {
    cy.get(this.sideBar, { timeout: this.defaultTimeout })
      .should('be.visible')
      .contains('Campaigns')
      .click();
    cy.url().should('include', 'campaigns');
    cy.contains('Campaigns', { timeout: this.defaultTimeout });
  }

  visitSubscribersTab() {
    cy.get(this.sideBar, { timeout: this.defaultTimeout })
      .should('be.visible')
      .contains('Subscribers')
      .click();
    cy.url().should('include', 'subscribers');
    cy.contains('Subscribers', { timeout: this.defaultTimeout });
  }
}
export default Sidebar;
