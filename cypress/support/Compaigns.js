/// <reference types="cypress" />
class Campaigns {
  constructor() {
    // Locators

    this.createCampaignButton = '[data-test-id="create-campaign-button"]';
    this.regularCampaignBlock =
      '[data-test-id="create-regular-campaign-block"]';
    this.campaignNameInput = '[data-test-id="campaign-name-input"]';
    this.subjectInput = '[data-test-id="subject-input"]';
    this.campaignPreheaderInput = '[data-test-id="campaign-preheader-input"]';
    this.addRecipientsButton = '[data-test-id="add-recipients-list-button"]';
    this.allSubscribersCheckbox = '[data-test-id="all-subscribers-checkbox"]';
    this.selectRecipientsButton = '[data-test-id="save-recipients-button"]';
    this.createCampaignNextButton =
      '[data-test-id="create-campaign-next-button"]';
    this.startFromScratchTab = '[data-test-id="start-from-scratch-tab"]';
    this.dragAndDropButton = '[data-test-id="drag-drop-editor"]';
    this.builderHeader = '.builder-header';
    this.subjectField = '[data-test-id="subject"]';
    this.senderField = '[data-test-id="sender"]';
    this.replyToField = '[data-test-id="reply-to"]';
    this.campaignLanguageField = '[data-test-id="campaign-language"]';
    this.recipientsSection = '[data-test-id="recipents-section"]';
    this.sendNowBlock = '[data-test-id="send-now-button"]';
    this.sendButton = '[data-test-id="button-send"]';
    this.outboxTab = '[data-test-id="outbox-campaigns-tab"] > span';
    this.loader = '.skeleton-loader-line';
    this.defaultTimeout = 8000;
  }

  startCampaignCreation() {
    cy.get(this.createCampaignButton, { timeout: this.defaultTimeout })
      .should('be.visible')
      .click();
    cy.contains('Choose campaign type', { timeout: this.defaultTimeout });
    cy.get(this.regularCampaignBlock, { timeout: this.defaultTimeout })
      .should('be.visible')
      .click();
  }

  fillCampaignDetails() {
    cy.fixture('emailAssertions').then((campaignData) => {
      cy.contains('Campaign details', { timeout: this.defaultTimeout });
      cy.get(this.campaignNameInput, { timeout: this.defaultTimeout })
        .click()
        .type(campaignData.campaignName);
      cy.get(this.subjectInput, { timeout: this.defaultTimeout })
        .click()
        .type(campaignData.subject);
      cy.get(this.campaignPreheaderInput, {
        timeout: this.defaultTimeout
      })
        .click()
        .type(campaignData.preheader);
    });
  }

  addRecipients() {
    cy.get(this.addRecipientsButton, { timeout: this.defaultTimeout }).click();
    cy.contains('Select recipients of your campaign', {
      timeout: this.defaultTimeout
    });
    cy.get(this.allSubscribersCheckbox, {
      timeout: this.defaultTimeout
    }).click();
    cy.get(this.selectRecipientsButton, {
      timeout: this.defaultTimeout
    })
      .should('be.enabled')
      .click();
  }

  proceedToEditor() {
    cy.get(this.createCampaignNextButton, {
      timeout: this.defaultTimeout
    })
      .should('be.enabled')
      .click();
    cy.contains('Email design', { timeout: this.defaultTimeout });
    cy.get(this.startFromScratchTab, { timeout: this.defaultTimeout }).click();
    cy.get(this.dragAndDropButton, { timeout: this.defaultTimeout }).click();
  }

  finalizeCampaign() {
    cy.get(this.loader, { timeout: 60000 }).should('not.be.visible');
    cy.get(this.builderHeader, { timeout: this.defaultTimeout })
      .contains('Done editing')
      .click();
    cy.contains('Review and schedule', { timeout: this.defaultTimeout });
  }

  verifyCampaignDetails() {
    cy.fixture('emailAssertions').then((campaignData) => {
      cy.get(this.subjectField, { timeout: this.defaultTimeout }).should(
        'contain.text',
        campaignData.subject
      );
      cy.get(this.senderField, { timeout: this.defaultTimeout }).should(
        'contain.text',
        `${campaignData.fromName} (${campaignData.fromEmail})`
      );
      cy.get(this.replyToField, { timeout: this.defaultTimeout }).should(
        'contain.text',
        campaignData.replyToEmail
      );
      cy.get(this.campaignLanguageField, {
        timeout: this.defaultTimeout
      }).should('contain.text', campaignData.campaignLanguage);
      cy.get(this.recipientsSection, { timeout: this.defaultTimeout }).should(
        'contain.text',
        campaignData.recipients
      );
    });
  }

  sendCampaign() {
    cy.get(this.sendNowBlock, { timeout: this.defaultTimeout }).click();
    cy.get(this.sendButton, { timeout: this.defaultTimeout })
      .contains('Send')
      .click();
  }

  waitForCampaignToBeSent() {
    cy.contains('Campaigns', { timeout: this.defaultTimeout });

    const checkCounter = () => {
      cy.get(this.outboxTab, { timeout: 10000 })
        .eq(1) // Targets the counter
        .then(($counter) => {
          if ($counter.text().trim() === '0') {
            cy.log('✅ Campaign successfully sent!');
          } else {
            cy.log(
              `⏳ Current counter: ${$counter.text().trim()}. Retrying...`
            );
            cy.wait(5000);
            cy.reload();
            checkCounter(); // Retry checking
          }
        });
    };

    checkCounter(); // A recuring method to verify email is sent
  }

  createAndSendCampaign() {
    this.startCampaignCreation();
    this.fillCampaignDetails();
    this.addRecipients();
    this.proceedToEditor();
    this.finalizeCampaign();
    this.verifyCampaignDetails();
    this.sendCampaign();
    this.waitForCampaignToBeSent();
  }
}

export default Campaigns;
