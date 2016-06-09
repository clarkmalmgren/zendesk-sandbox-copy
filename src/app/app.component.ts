import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import { SetupComponent } from './views/setup';
import { PrepareComponent } from './views/prepare';

@Component({
  moduleId: module.id,
  selector: 'zendesk-sandbox-copy',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ],
  directives: [ ROUTER_DIRECTIVES ]
})
@Routes([
  { path: '/', component: SetupComponent },
  { path: '/prepare', component: PrepareComponent }
])
export class ZendeskSandboxCopyAppComponent implements OnInit {

  constructor(private router : Router) {}

  ngOnInit() {
    this.router.navigate(['/']);
  }
}
