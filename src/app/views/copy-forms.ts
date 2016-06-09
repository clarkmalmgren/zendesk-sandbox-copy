import { Component, OnInit } from '@angular/core';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { Context } from '../services/context';
import { Zendesk } from '../services/zendesk';
import { TicketForm } from '../models/ticket-form';

@Component({
  moduleId: module.id,
  templateUrl: 'copy-forms.html',
  styleUrls: [ 'copy-forms.css' ],
  directives: [ MD_LIST_DIRECTIVES, MD_ICON_DIRECTIVES ],
  providers: [ MdIconRegistry, Zendesk ]
})
export class CopyFormsComponent implements OnInit {

  ticket_forms : TicketForm[];
  status : { [id : number] : string } = { };

  constructor(public context: Context,
              private zendesk: Zendesk) {}

  ngOnInit() {
    this.zendesk.listForms(true)
      .subscribe((forms) => {
        this.ticket_forms = forms;
        this.sync(0);
      });
  }

  sync(index: number) {
    if (index >= this.ticket_forms.length) {
      return;
    }

    let form = this.ticket_forms[index];

    if (!form.active) {
      this.status[form.id] = 'skipped';
      this.sync(index + 1);
    } else {
      this.status[form.id] = 'active';
      this.zendesk.createForm(false, form)
        .subscribe(
          (created) => {
            this.status[form.id] = 'success';
            this.sync(index + 1);
          },
          (error) => {
            this.status[form.id] = 'failure';
            this.sync(index + 1);
          }
        );
    }
  }
}
