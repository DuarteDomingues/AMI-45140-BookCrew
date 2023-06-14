import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { BookpagePageRoutingModule } from './bookpage-routing.module';

import { BookpagePage } from './bookpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    BookpagePageRoutingModule
  ],
  declarations: [BookpagePage]
})
export class BookpagePageModule {}
