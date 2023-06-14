import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchfullPage } from './searchfull.page';

const routes: Routes = [
  {
    path: '',
    component: SearchfullPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchfullPageRoutingModule {}
