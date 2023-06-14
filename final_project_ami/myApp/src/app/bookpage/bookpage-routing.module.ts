import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookpagePage } from './bookpage.page';

const routes: Routes = [
  {
    path: '',
    component: BookpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookpagePageRoutingModule {}
