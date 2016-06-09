import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Context } from './context';
import { TicketField } from '../models/ticket-field';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Zendesk {

  constructor(private context: Context, private http: Http) {}

  base(isProd: boolean) {
    return 'https://' + (isProd ? this.context.production : this.context.sandbox) + '.zendesk.com/api/v2';
  }

  options(): RequestOptions {
    let options : RequestOptions = new RequestOptions();
    let headers = options.headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Basic ' + btoa(`${this.context.email}:${this.context.password}`));
    return options; 
  }

  listFields(isProd: boolean): Observable<TicketField[]> {
    return this.http.get(`${this.base(isProd)}/ticket_fields.json`, this.options())
      .map((response) => {
        return response.json().ticket_fields as TicketField[];
      });
  }

  createField(isProd: boolean, field: TicketField): Observable<TicketField> {
    let clone = {};
    [
      'type',
      'title',
      'description',
      'active',
      'required',
      'collapsed_for_agents',
      'regexp_for_validation',
      'title_in_portal',
      'visible_in_portal',
      'editable_in_portal',
      'required_in_portal',
      'tag',
      'custom_field_options'
    ].forEach((key) => { clone[key] = field[key]; });

    let payload = JSON.stringify({ ticket_field : clone });
    
    return this.http.post(`${this.base(isProd)}/ticket_fields.json`, payload, this.options())
      .map((response) => {
        return response.json().ticket_field as TicketField;
      });
  }
}
