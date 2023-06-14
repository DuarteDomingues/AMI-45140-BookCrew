import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewfullPageRoutingModule } from './reviewfull-routing.module';

import { ReviewfullPage } from './reviewfull.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewfullPageRoutingModule
  ],
  declarations: [ReviewfullPage]
})
export class ReviewfullPageModule {}
