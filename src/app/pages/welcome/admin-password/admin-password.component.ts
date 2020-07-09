import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../../services/authorization.service';
import {Router} from '@angular/router';
import {AppService} from '../../../services/app.service';

@Component({
  selector: 'app-admin-password',
  templateUrl: './admin-password.component.html',
  styleUrls: ['./admin-password.component.css']
})
export class AdminPasswordComponent implements OnInit {

  getParams: any;
  password: string;
  confirmPassword: string;

  constructor(
    private authorization: AuthorizationService,
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getParams = this.appService.getGetParams();
  }

  submit() {
    if (this.password.length >= 6 && this.confirmPassword === this.password) {
      this.authorization.adminSetPassword(this.password, this.getParams.key).subscribe(result => {
        if (result.success) {
          localStorage.setItem('userData', JSON.stringify(result.data));
          localStorage.setItem('userId', result.data.id.toString());
          localStorage.setItem('userToken', result.data.token);
          if (result.data.isAdmin) {
            this.router.navigateByUrl('/registration/1').then();
          } else {
            this.router.navigateByUrl('/service/notifications').then();
          }
        }
      });
    }
  }
}
