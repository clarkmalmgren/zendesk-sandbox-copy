import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode } from '@angular/core';

import {
  ZendeskSandboxCopyAppComponent,
  environment,
  Context
} from './app/';

const SINGLETONS = [
  Context
];

if (environment.production) {
  enableProdMode();
}

bootstrap(ZendeskSandboxCopyAppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  SINGLETONS
]);

