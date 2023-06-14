import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewfullPage } from './reviewfull.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewfullPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewfullPageRoutingModule {}
