import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { Context } from '../services/context';
import { Zendesk } from '../services/zendesk';
import { TicketField, isSystemField } from '../models/ticket-field';

@Component({
  moduleId: module.id,
  templateUrl: 'delete-fields.html',
  styleUrls: [ 'delete-fields.css' ],
  directives: [ MD_LIST_DIRECTIVES, MD_ICON_DIRECTIVES ],
  providers: [ MdIconRegistry, Zendesk ]
})
export class DeleteFieldsComponent implements OnInit {

  ticket_fields : TicketField[];
  status : { [id : number] : string } = { };

  constructor(public context: Context,
              private zendesk: Zendesk,
              private router: Router) {}

  ngOnInit() {
    this.zendesk.listFields(false)
      .subscribe((fields) => {
        this.ticket_fields = fields;
        this.deleteItem(0);
      });
  }

  deleteItem(index: number) {
    if (index >= this.ticket_fields.length) {
      this.router.navigate(['/copy-fields']);
      return;
    }

    let field = this.ticket_fields[index];

    if (isSystemField(field)) {
      this.status[field.id] = 'skipped';
      this.context.system_mapping[field.type] = field.id;
      this.deleteItem(index + 1);
    } else {
      this.status[field.id] = 'active';
      this.zendesk.deleteField(false, field)
        .subscribe(
          () => {
            this.status[field.id] = 'success';
            this.deleteItem(index + 1);
          },
          (error) => {
            this.status[field.id] = 'failure';
            this.deleteItem(index + 1);
          }
        );
    }
  }
}
