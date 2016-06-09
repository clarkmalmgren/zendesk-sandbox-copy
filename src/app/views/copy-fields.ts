import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { Context } from '../services/context';
import { Zendesk } from '../services/zendesk';
import { TicketField, isSystemField } from '../models/ticket-field';

@Component({
  moduleId: module.id,
  templateUrl: 'copy-fields.html',
  styleUrls: [ 'copy-fields.css' ],
  directives: [ MD_LIST_DIRECTIVES, MD_ICON_DIRECTIVES ],
  providers: [ MdIconRegistry, Zendesk ]
})
export class CopyFieldsComponent implements OnInit {

  ticket_fields : TicketField[];
  status : { [id : number] : string } = { };

  constructor(public context: Context,
              private zendesk: Zendesk,
              private router: Router) {}

  ngOnInit() {
    this.zendesk.listFields(true)
      .subscribe((fields) => {
        this.ticket_fields = fields;
        this.sync(0);
      });
  }

  sync(index: number) {
    if (index >= this.ticket_fields.length) {
      this.router.navigate(['/delete-forms']);
      return;
    }

    let field = this.ticket_fields[index];

    if (!field.active) {
      this.status[field.id] = 'skipped';
      this.sync(index + 1);
    } else if (isSystemField(field)) {
      this.context.field_mappings[field.id] = this.context.system_mapping[field.type];
      this.status[field.id] = 'skipped';
      this.sync(index + 1);
    } else {
      this.status[field.id] = 'active';
      this.zendesk.createField(false, field)
        .subscribe(
          (created) => {
            this.context.field_mappings[field.id] = created.id;
            this.status[field.id] = 'success';
            this.sync(index + 1);
          },
          (error) => {
            this.status[field.id] = 'failure';
            this.sync(index + 1);
          }
        );
    }
  }
}
