export class ZendeskSandboxCopyPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('zendesk-sandbox-copy-app h1')).getText();
  }
}
