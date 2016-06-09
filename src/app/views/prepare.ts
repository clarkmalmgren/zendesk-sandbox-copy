import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Context } from '../services/context';

@Component({
  moduleId: module.id,
  templateUrl: 'prepare.html',
  styleUrls: [ 'prepare.css' ],
  directives: [ ]
})
export class PrepareComponent implements OnInit {

  payload : any;

  constructor(public context: Context,
              private http: Http) {}

  ngOnInit() {
    let options : RequestOptions = new RequestOptions();
    let headers = options.headers = new Headers();
    headers.append('Authorization','Basic ' + btoa(`${this.context.email}:${this.context.password}`)); 

    this.http.get(`https://${this.context.production}.zendesk.com/api/v2/ticket_fields.json`, options)
      .subscribe((response) => {
        this.payload = response.json();
      });
  }
}
