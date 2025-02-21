import Login from '../support/Login';
import Sidebar from '../support/Sidebar';
import MailosaurHelper from '../support/MailosaurHelper';
import Subscribers from '../support/Subscribers';

describe('Unsubscribe From An Email', () => {
  before(() => {
    cy.createGroup();
    cy.addSubscriber();
    cy.getSubscribers();
    cy.createCampaign().then(() => {
      cy.scheduleCampaign();
    });
  });
  it(
    'TC_0002 - should allow a user to unsubscribe from an email and verify the status',
    { tags: '@Smoke' },
    () => {
      const login = new Login();
      const sidebar = new Sidebar();
      const mailosaur = new MailosaurHelper();
      const subscribers = new Subscribers();

      cy.fixture('emailAssertions').then((data) => {
        mailosaur.fetchEmail().then(({ email, emailData }) => {
          mailosaur.validateEmailReceipt(email, emailData);
          mailosaur.openUnsubscribeLink(email);
          mailosaur.confirmUnsubscription(data.unsubscribeReason);

          login.visitPage();
          login.loginUsingUi();

          sidebar.visitSubscribersTab();

          subscribers.filterByUnsubscribed();
          subscribers.verifyUnsubscribedUser(
            data.testEmail,
            data.unsubscribeReason
          );
        });
      });
    }
  );
});
