import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../services/authorization.service';
import {ResultDialogComponent} from '../../../ui/modals/result-dialog/result-dialog.component';
import {MatDialog} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  step = 1;
  form: FormGroup;

  verifyCode: string;

  constructor(
    private formBuilder: FormBuilder,
    private authorization: AuthorizationService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.form = this.formBuilder.group({
      country: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      agree: [false, Validators.required]
    });
  }

  ngOnInit() {
  }

  singUp() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const body = this.form.getRawValue();
      body.code = this.verifyCode;
      this.authorization.addAdmin(body).subscribe(result => {
        if (result.success) {
          localStorage.setItem('userData', JSON.stringify(result.data));
          localStorage.setItem('userId', result.data.id.toString());
          this.step = 3;
        } else {
          switch (result.error.code) {
            case 0:
              console.error(result.error.message);
              break;
            case 400:
              this.dialog.open(
                ResultDialogComponent,
                {data: {success: false, title: this.translate.instant('other.welcome.registration.error_bad_sms')}});
              break;
            case 403:
              this.dialog.open(
                ResultDialogComponent,
                {data: {success: false, title: this.translate.instant('other.welcome.registration.error_bad_phone')}});
              break;
          }
        }
      });
    }
  }

  sendPhoneCode() {
    this.form.markAllAsTouched();
    if (this.form.valid && this.form.get('email').value) {
      this.authorization.sendPhoneCode(this.form.get('phone').value).subscribe(result => {
        if (!result.success) {
          this.dialog.open(
            ResultDialogComponent,
            {data: {success: false, title: this.translate.instant('other.welcome.registration.error_bad_phone')}});
        } else {
          this.step = 2;
        }
      });
    }
  }
}
