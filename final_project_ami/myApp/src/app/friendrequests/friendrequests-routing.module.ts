import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendrequestsPage } from './friendrequests.page';

const routes: Routes = [
  {
    path: '',
    component: FriendrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendrequestsPageRoutingModule {}
