/// <reference types="cypress" />

class MailosaurHelper {
  constructor() {
    this.unsubscribeReasonRadioButton = '.custom-control-label';
    this.saveReason = '.unsubscribe-reason-save';
    this.confirmMessage = '#confirmedReasonMessage';
    this.serverId = Cypress.env('mailosaurServerId');
    this.yesButton = '#optout_link';
    this.defaultTimeout = 8000;
  }

  fetchEmail() {
    return cy.fixture('emailAssertions').then((emailData) => {
      cy.log(emailData);

      return cy
        .mailosaurGetMessage(
          this.serverId,
          { sentTo: emailData.testEmail },
          { timeout: 660000 }
        )
        .then((email) => {
          cy.wrap({ email, emailData });
        });
    });
  }

  validateEmailReceipt(email, emailData) {
    cy.log('📩 Validating Email Receipt');

    cy.wrap(email).should((emailDetails) => {
      expect(emailDetails.from[0].email).to.eq(emailData.fromEmail);
      expect(emailDetails.from[0].name).to.eq(emailData.fromName);
      expect(emailDetails.to[0].email).to.eq(emailData.testEmail);
      expect(emailDetails.subject).to.eq(emailData.subject);
      expect(emailDetails.html.body).to.include(emailData.expectedBodyText);
    });

    cy.log('✅ Email successfully validated');
  }

  openUnsubscribeLink(email) {
    cy.log(`📧 Searching for unsubscribe link in email: ${email.subject}`);

    cy.wrap(email).then((emailData) => {
      cy.log('🔗 Available links:', JSON.stringify(emailData.html.links));

      const unsubscribeLink = emailData.html.links.find((link) =>
        link.text.toLowerCase().includes('unsubscribe')
      );

      expect(unsubscribeLink, 'Unsubscribe link should exist').to.exist;

      cy.log(`🔗 Unsubscribe URL found: ${unsubscribeLink.href}`);
      cy.visit(unsubscribeLink.href);
    });
  }

  confirmUnsubscription() {
    cy.get(this.yesButton, { timeout: this.defaultTimeout }).click();
    cy.get(this.unsubscribeReasonRadioButton, { timeout: this.defaultTimeout })
      .first()
      .click();
    cy.get(this.saveReason, { timeout: this.defaultTimeout })
      .should('be.visible')
      .click();
    cy.get(this.confirmMessage, { timeout: this.defaultTimeout })
      .should('be.visible')
      .should('contain.text', 'You have successfully unsubscribed');
  }
}

export default MailosaurHelper;
