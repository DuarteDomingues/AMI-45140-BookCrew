import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendspagePageRoutingModule } from './friendspage-routing.module';

import { FriendspagePage } from './friendspage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendspagePageRoutingModule
  ],
  declarations: [FriendspagePage]
})
export class FriendspagePageModule {}
