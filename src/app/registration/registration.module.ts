import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationFormComponent } from './src/app/registration/registration-form/registration-form.component';
import { LoginFormComponent } from './src/app/registration/login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ],
  declarations: [RegistrationFormComponent, LoginFormComponent]
})
export class RegistrationModule { }
