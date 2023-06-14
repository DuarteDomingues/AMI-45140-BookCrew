import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserprofileotherPageRoutingModule } from './userprofileother-routing.module';

import { UserprofileotherPage } from './userprofileother.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserprofileotherPageRoutingModule
  ],
  declarations: [UserprofileotherPage]
})
export class UserprofileotherPageModule {}
