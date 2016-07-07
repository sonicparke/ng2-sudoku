import { Component, OnInit } from '@angular/core';
import { COMMON_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [
    COMMON_DIRECTIVES,
    ROUTER_DIRECTIVES,
  ]
})
export class HeaderComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
