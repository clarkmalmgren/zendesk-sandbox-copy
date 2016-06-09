import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { Context } from '../services/context';
import { Zendesk } from '../services/zendesk';
import { TicketForm } from '../models/ticket-form';

@Component({
  moduleId: module.id,
  templateUrl: 'delete-forms.html',
  styleUrls: [ 'delete-forms.css' ],
  directives: [ MD_LIST_DIRECTIVES, MD_ICON_DIRECTIVES ],
  providers: [ MdIconRegistry, Zendesk ]
})
export class DeleteFormsComponent implements OnInit {

  ticket_forms : TicketForm[];
  status : { [id : number] : string } = { };

  constructor(public context: Context,
              private zendesk: Zendesk,
              private router: Router) {}

  ngOnInit() {
    this.zendesk.listForms(false)
      .subscribe((forms) => {
        this.ticket_forms = forms;
        this.deleteItem(0);
      });
  }

  deleteItem(index: number) {
    if (index >= this.ticket_forms.length) {
      this.router.navigate(['/copy-forms']);
      return;
    }

    let form = this.ticket_forms[index];

    if (form.default) {
      this.status[form.id] = 'skipped';
      this.deleteItem(index + 1);
    } else {
      this.status[form.id] = 'active';
      this.zendesk.deleteForm(false, form)
        .subscribe(
          () => {
            this.status[form.id] = 'success';
            this.deleteItem(index + 1);
          },
          (error) => {
            this.status[form.id] = 'failure';
            this.deleteItem(index + 1);
          }
        );
    }
  }
}
