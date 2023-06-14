import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchfullPageRoutingModule } from './searchfull-routing.module';

import { SearchfullPage } from './searchfull.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchfullPageRoutingModule
  ],
  declarations: [SearchfullPage]
})
export class SearchfullPageModule {}
