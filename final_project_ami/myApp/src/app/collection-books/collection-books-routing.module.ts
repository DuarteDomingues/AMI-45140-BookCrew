import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionBooksPage } from './collection-books.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionBooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionBooksPageRoutingModule {}
