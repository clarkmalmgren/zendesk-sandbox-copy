import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Context } from './context';
import { TicketField, cloneTicketField } from '../models/ticket-field';
import { TicketForm, cloneTicketForm } from '../models/ticket-form';
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
    let payload = JSON.stringify({ ticket_field : cloneTicketField(field) });
    
    return this.http.post(`${this.base(isProd)}/ticket_fields.json`, payload, this.options())
      .map((response) => {
        return response.json().ticket_field as TicketField;
      });
  }

  deleteField(isProd: boolean, field: TicketField): Observable<any> {
    return this.http.delete(`${this.base(isProd)}/ticket_fields/${field.id}.json`, this.options());
  }

  listForms(isProd: boolean): Observable<TicketForm[]> {
    return this.http.get(`${this.base(isProd)}/ticket_forms.json`, this.options())
      .map((response) => {
        return response.json().ticket_forms as TicketForm[];
      });
  }

  createForm(isProd: boolean, form: TicketForm): Observable<TicketForm> {
    let clone = cloneTicketForm(form);

    // Transpositions for Fields
    clone.ticket_field_ids = clone.ticket_field_ids.map((id) => {
      return this.context.field_mappings[id];
    });

    let payload = JSON.stringify({ ticket_form : clone });
    
    return this.http.post(`${this.base(isProd)}/ticket_forms.json`, payload, this.options())
      .map((response) => {
        return response.json().ticket_form as TicketForm;
      });
  }

  deleteForm(isProd: boolean, form: TicketForm): Observable<any> {
    return this.http.delete(`${this.base(isProd)}/ticket_forms/${form.id}.json`, this.options());
  }
}
