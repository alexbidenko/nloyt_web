import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { Step1Component } from './pages/registration/step1/step1.component';
import { Step3Component } from './pages/registration/step3/step3.component';
import { Step4Component } from './pages/registration/step4/step4.component';
import { Step5Component } from './pages/registration/step5/step5.component';
import { Step6Component } from './pages/registration/step6/step6.component';
import { Step7Component } from './pages/registration/step7/step7.component';
import { Step8Component } from './pages/registration/step8/step8.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import {HttpClient} from '@angular/common/http';
import { ConfirmDialogComponent } from './ui/modals/confirm-dialog/confirm-dialog.component';
import { ResultDialogComponent } from './ui/modals/result-dialog/result-dialog.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LangDialogComponent } from './ui/modals/lang-dialog/lang-dialog.component';
import { LoginComponent } from './pages/welcome/login/login.component';
import { SingUpComponent } from './pages/welcome/sing-up/sing-up.component';
import { AdminPasswordComponent } from './pages/welcome/admin-password/admin-password.component';
import { SchedulesModalComponent } from './ui/modals/schedules-modal/schedules-modal.component';
import { AddressDialogComponent } from './ui/modals/address-dialog/address-dialog.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    Step1Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component,
    Step8Component,
    RegistrationComponent,
    LoginComponent,
    SingUpComponent,
    AdminPasswordComponent,
    SchedulesModalComponent,
    AddressDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {provide: 'BASE_URL', useValue: 'http://194.182.85.89/'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    LangDialogComponent,
    ResultDialogComponent,
    SchedulesModalComponent,
    AddressDialogComponent
  ]
})
export class AppModule { }
