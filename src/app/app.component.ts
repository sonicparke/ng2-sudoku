import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ROUTER_DIRECTIVES } from '@angular/router';



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    HeaderComponent,
    ROUTER_DIRECTIVES
  ]
})
export class AppComponent {
  title = 'app works!';
}
