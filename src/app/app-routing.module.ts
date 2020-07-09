import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {LoginComponent} from './pages/welcome/login/login.component';
import {SingUpComponent} from './pages/welcome/sing-up/sing-up.component';
import {AdminPasswordComponent} from './pages/welcome/admin-password/admin-password.component';
import {RegistrationComponent} from './pages/registration/registration.component';
import {Step1Component} from './pages/registration/step1/step1.component';
import {Step3Component} from './pages/registration/step3/step3.component';
import {Step4Component} from './pages/registration/step4/step4.component';
import {Step5Component} from './pages/registration/step5/step5.component';
import {Step6Component} from './pages/registration/step6/step6.component';
import {Step7Component} from './pages/registration/step7/step7.component';
import {Step8Component} from './pages/registration/step8/step8.component';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'sing-up', component: SingUpComponent },
      { path: 'password', component: AdminPasswordComponent }
    ]
  },
  { path: 'service', loadChildren: () => import('./pages/service/service.module').then(m => m.ServiceModule) },
  { path: 'registration', component: RegistrationComponent,
    children: [
      { path: '1', component: Step1Component },
      { path: '3', component: Step3Component },
      { path: '4', component: Step4Component },
      { path: '5', component: Step5Component },
      { path: '6', component: Step6Component },
      { path: '7', component: Step7Component },
      { path: '8', component: Step8Component }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
