import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendrequestsPageRoutingModule } from './friendrequests-routing.module';

import { FriendrequestsPage } from './friendrequests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendrequestsPageRoutingModule
  ],
  declarations: [FriendrequestsPage]
})
export class FriendrequestsPageModule {}
