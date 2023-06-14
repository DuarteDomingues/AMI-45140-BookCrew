import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionBooksPageRoutingModule } from './collection-books-routing.module';

import { CollectionBooksPage } from './collection-books.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionBooksPageRoutingModule
  ],
  declarations: [CollectionBooksPage]
})
export class CollectionBooksPageModule {}
