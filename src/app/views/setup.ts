import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MdAnchor } from '@angular2-material/button';
import { Context } from '../services/context';

@Component({
  moduleId: module.id,
  templateUrl: 'setup.html',
  styleUrls: [ 'setup.css' ],
  directives: [ MD_INPUT_DIRECTIVES, MdAnchor, ROUTER_DIRECTIVES ]
})
export class SetupComponent {

  constructor(public context: Context) {}
}
