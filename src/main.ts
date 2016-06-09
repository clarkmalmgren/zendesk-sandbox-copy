import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ZendeskSandboxCopyAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(ZendeskSandboxCopyAppComponent);

