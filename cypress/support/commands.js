// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-mailosaur';
import { faker } from '@faker-js/faker';

// Create a Group and Store its ID
Cypress.Commands.add('createGroup', () => {
  const authToken = Cypress.env('AUTH_TOKEN');
  const apiUrl = Cypress.env('apiurl');
  const groupName = `TestGroup_${Date.now()}`; // Unique group name

  cy.log(`📁 Creating Group: ${groupName}`);

  cy.api({
    method: 'POST',
    url: `${apiUrl}/groups`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: { name: groupName }
  }).then((response) => {
    expect(response.status).to.eq(201);
    const groupId = response.body.data.id;
    Cypress.env('groupId', groupId);
    cy.log(`✅ Group Created with ID: ${groupId}`);
  });
});

// Get Active Subscribers
Cypress.Commands.add('getSubscribers', () => {
  const authToken = Cypress.env('AUTH_TOKEN');
  const apiUrl = Cypress.env('apiurl');

  cy.api({
    method: 'GET',
    url: `${apiUrl}/subscribers?filter[status]=active`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);

    const emails = response.body.data.map((subscriber) => subscriber.email);
    cy.log(`📌 Total Subscribed Users: ${emails.length}`, emails);
    cy.wrap(emails).as('subscriberEmails');
  });
});

// Add a Subscriber and Write to Fixtures File
Cypress.Commands.add('addSubscriber', () => {
  const authToken = Cypress.env('AUTH_TOKEN');
  const apiUrl = Cypress.env('apiurl');
  const domain = Cypress.env('emailDomain');
  const serverId = Cypress.env('mailosaurServerId');
  const groupId = Cypress.env('groupId');

  let email = `${faker.string.alphanumeric(10)}@${serverId}.${domain}`;
  email = email.toLowerCase();

  const subscriber = {
    email,
    name: faker.person.fullName(),
    groups: [groupId]
  };

  cy.log(`📩 Adding Subscriber: ${email}`);

  cy.api({
    method: 'POST',
    url: `${apiUrl}/subscribers`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: subscriber
  }).then((response) => {
    expect(response.status).to.eq(201);
    cy.log(`✅ Subscriber ${email} Added Successfully`);

    const fixturePath = 'cypress/fixtures/emailAssertions.json';

    // ✅ Read existing JSON file, modify & write back
    cy.readFile(fixturePath).then((data) => {
      data.testEmail = email; // Update only 'testEmail'
      cy.writeFile(fixturePath, data); // Save the updated JSON
    });
  });
});

// Create a Campaign
Cypress.Commands.add('createCampaign', () => {
  const authToken = Cypress.env('AUTH_TOKEN');
  const apiUrl = Cypress.env('apiurl');
  const verifiedSenderEmail = Cypress.env('email');

  cy.fixture('emailAssertions').then((emailData) => {
    const campaignPayload = {
      name: emailData.campaignName,
      type: 'regular',
      emails: [
        {
          subject: emailData.subject,
          from_name: emailData.fromName,
          from: verifiedSenderEmail,
          reply_to: verifiedSenderEmail,
          content: 'testttt'
        }
      ],
      groups: [Cypress.env('groupId')]
    };

    cy.log('📢 Creating Campaign:', campaignPayload);

    cy.api({
      method: 'POST',
      url: `${apiUrl}/campaigns`,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: campaignPayload
    }).then((response) => {
      expect(response.status).to.eq(201);
      const campaignId = response.body.data.id;
      Cypress.env('campaignId', campaignId);
      cy.log(`✅ Campaign Created: ${campaignId}`);
    });
  });
});

// Schedule a Campaign (Instant)
Cypress.Commands.add('scheduleCampaign', () => {
  const authToken = Cypress.env('AUTH_TOKEN');
  const apiUrl = Cypress.env('apiurl');
  const campaignId = Cypress.env('campaignId');

  cy.log(`📬 Scheduling Campaign Instantly: ${campaignId}`);

  cy.api({
    method: 'POST',
    url: `${apiUrl}/campaigns/${campaignId}/schedule`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: { delivery: 'instant' }
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(`✅ Campaign ${campaignId} Scheduled Successfully`);
  });
});
