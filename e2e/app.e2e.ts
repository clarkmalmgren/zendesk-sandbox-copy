import { ZendeskSandboxCopyPage } from './app.po';

describe('zendesk-sandbox-copy App', function() {
  let page: ZendeskSandboxCopyPage;

  beforeEach(() => {
    page = new ZendeskSandboxCopyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('zendesk-sandbox-copy works!');
  });
});
