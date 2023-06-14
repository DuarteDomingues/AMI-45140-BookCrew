import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserprofileotherPage } from './userprofileother.page';

const routes: Routes = [
  {
    path: '',
    component: UserprofileotherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserprofileotherPageRoutingModule {}
