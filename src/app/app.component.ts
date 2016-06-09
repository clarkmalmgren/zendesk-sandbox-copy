import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import { SetupComponent } from './views/setup';
import { CopyFieldsComponent } from './views/copy-fields';
import { DeleteFieldsComponent } from './views/delete-fields';
import { CopyFormsComponent } from './views/copy-forms';
import { DeleteFormsComponent } from './views/delete-forms';

@Component({
  moduleId: module.id,
  selector: 'zendesk-sandbox-copy',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ],
  directives: [ ROUTER_DIRECTIVES ]
})
@Routes([
  { path: '/', component: SetupComponent },
  { path: '/copy-fields', component: CopyFieldsComponent },
  { path: '/delete-fields', component: DeleteFieldsComponent },
  { path: '/copy-forms', component: CopyFormsComponent },
  { path: '/delete-forms', component: DeleteFormsComponent }
])
export class ZendeskSandboxCopyAppComponent implements OnInit {

  constructor(private router : Router) {}

  ngOnInit() {
    this.router.navigate(['/']);
  }
}
