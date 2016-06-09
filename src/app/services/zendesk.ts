import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Context } from './context';
import { TicketField } from '../models/ticket-field';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Zendesk {

  constructor(private context: Context, private http: Http) {}

  base(prod: boolean) {
    return 'https://' + (prod ? this.context.production : this.context.sandbox) + '.zendesk.com/api/v2';
  }

  options(): RequestOptions {
    let options : RequestOptions = new RequestOptions();
    let headers = options.headers = new Headers();
    headers.append('Authorization','Basic ' + btoa(`${this.context.email}:${this.context.password}`));
    return options; 
  }

  listFields(prod: boolean): Observable<TicketField[]> {
    return this.http.get(`${this.base(prod)}/ticket_fields.json`, this.options())
      .map((response) => {
        return response.json().ticket_fields as TicketField[];
      });
  }

  createField(prod: boolean, field: TicketField): Observable<TicketField> {
    let payload = JSON.stringify(field);
    
    return this.http.post(`${this.base(prod)}/ticket_fields.json`, payload, this.options())
      .map((response) => {
        return response.json().ticket_field as TicketField;
      });
  }
}
