import { Injectable } from '@angular/core';

@Injectable()
export class Context {

  production : string;
  sandbox : string;

  email : string;
  password : string;

  field_mappings : { [ id : number] : number } = {};
  form_mappings : { [ id : number] : number } = {};
}