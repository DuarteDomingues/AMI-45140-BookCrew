import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpOnePageRoutingModule } from './sign-up-one-routing.module';

import { SignUpOnePage } from './sign-up-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpOnePageRoutingModule
  ],
  declarations: [SignUpOnePage]
})
export class SignUpOnePageModule {}
