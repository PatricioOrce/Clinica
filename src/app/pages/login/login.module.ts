import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { VerifyEmailComponent } from 'src/app/components/verify-email/verify-email.component';
import { CaptchaPropioComponent } from 'src/app/components/captcha-propio/captcha-propio.component';


@NgModule({
  declarations: [
    LoginComponent,
    CaptchaPropioComponent,

  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,

  ]
})
export class LoginModule {

}
