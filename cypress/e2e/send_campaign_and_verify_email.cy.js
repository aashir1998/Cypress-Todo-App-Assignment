import Login from '../support/Login';
import Sidebar from '../support/Sidebar';
import MailosaurHelper from '../support/MailosaurHelper';
import Campaigns from '../support/Compaigns';

describe('Send a Campaign and Verify Email Delivery', () => {
  before(() => {
    cy.createGroup();
    cy.addSubscriber();
    cy.getSubscribers();
  });
  it(
    'TC_0001- logs in, creates a campaign, sends it, and validates email reception',
    { tags: '@Regression' },
    () => {
      const login = new Login();
      const sidebar = new Sidebar();
      const mailosaur = new MailosaurHelper();
      const campaigns = new Campaigns();

      login.visitPage();
      login.loginUsingUi();

      sidebar.visitCampaignsTab();

      campaigns.createAndSendCampaign();

      mailosaur.fetchEmail().then(({ email, emailData }) => {
        mailosaur.validateEmailReceipt(email, emailData);
      });
    }
  );
});
