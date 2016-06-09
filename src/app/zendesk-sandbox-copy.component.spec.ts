import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ZendeskSandboxCopyAppComponent } from '../app/zendesk-sandbox-copy.component';

beforeEachProviders(() => [ZendeskSandboxCopyAppComponent]);

describe('App: ZendeskSandboxCopy', () => {
  it('should create the app',
      inject([ZendeskSandboxCopyAppComponent], (app: ZendeskSandboxCopyAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'zendesk-sandbox-copy works!\'',
      inject([ZendeskSandboxCopyAppComponent], (app: ZendeskSandboxCopyAppComponent) => {
    expect(app.title).toEqual('zendesk-sandbox-copy works!');
  }));
});
