import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  step: number;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.step = +location.href.charAt(location.href.length - 1);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.step = +location.href.charAt(location.href.length - 1);
      }
    });
  }
}
