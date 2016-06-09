import { Component, OnInit } from '@angular/core';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { Context } from '../services/context';
import { Zendesk } from '../services/zendesk';
import { TicketField } from '../models/ticket-field';

@Component({
  moduleId: module.id,
  templateUrl: 'fields.html',
  styleUrls: [ 'fields.css' ],
  directives: [ MD_LIST_DIRECTIVES, MD_ICON_DIRECTIVES ],
  providers: [ MdIconRegistry, Zendesk ]
})
export class FieldsComponent implements OnInit {

  ticket_fields : TicketField[];
  status : { [id : number] : string } = { };

  constructor(public context: Context,
              private zendesk: Zendesk) {}

  ngOnInit() {
    this.zendesk.listFields(true)
      .subscribe((fields) => {
        this.ticket_fields = fields;
        this.sync(0);
      });
  }

  sync(index: number) {
    if (index >= this.ticket_fields.length) {
      return;
    }

    let field = this.ticket_fields[index];
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
