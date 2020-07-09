import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../../services/authorization.service';
import {ResultDialogComponent} from '../../../ui/modals/result-dialog/result-dialog.component';
import {MatDialog} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit() {}

  singIn() {
    if (this.email && this.password) {
      this.authorizationService.login({
        email: this.email,
        password: this.password
      }).subscribe(data => {
        if (data.success) {
          localStorage.setItem('userData', JSON.stringify(data.data));
          localStorage.setItem('userId', data.data.id);
          localStorage.setItem('userToken', data.data.token);
          if (data.data.service) {
            localStorage.setItem('service', JSON.stringify(data.data.service));
            this.router.navigateByUrl('service/notifications').then();
          } else {
            this.router.navigateByUrl('registration/1').then();
          }
        } else {
          this.dialog.open(ResultDialogComponent, {
            data: {success: true, title: this.translate.instant('other.welcome.login.error')}
          });
        }
      });
    }
  }
}
