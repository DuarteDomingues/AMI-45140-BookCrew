import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sign-up-one/sign-up-one.module').then( m => m.SignUpOnePageModule)
  // path: '',
  // loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)

   // path: '',
   // loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
 // {
   // path: '',
    //loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  //},
  
  {
    path: 'sign-up-one',
    loadChildren: () => import('./sign-up-one/sign-up-one.module').then( m => m.SignUpOnePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'reviewfull',
    loadChildren: () => import('./reviewfull/reviewfull.module').then( m => m.ReviewfullPageModule)
  },
  
  {
    path: 'modalpage',
    loadChildren: () => import('./modalpage/modalpage.module').then( m => m.ModalpagePageModule)
  },
  {
    path: 'searchfull',
    loadChildren: () => import('./searchfull/searchfull.module').then( m => m.SearchfullPageModule)
  },
  {
    path: 'bookpage',
    loadChildren: () => import('./bookpage/bookpage.module').then( m => m.BookpagePageModule)
  },
  {
    path: 'collection',
    loadChildren: () => import('./collection/collection.module').then( m => m.CollectionPageModule)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./userprofile/userprofile.module').then( m => m.UserprofilePageModule)
  },
  //{
    //path: 'friendspage',
    //loadChildren: () => import('./friendspage/friendspage.module').then( m => m.FriendspagePageModule)
  //},
  {
    path: 'collection-books',
    loadChildren: () => import('./collection-books/collection-books.module').then( m => m.CollectionBooksPageModule)
  },
  {
    path: 'friendspage',
    loadChildren: () => import('./friendspage/friendspage.module').then( m => m.FriendspagePageModule)
  },
  {
    path: 'friendrequests',
    loadChildren: () => import('./friendrequests/friendrequests.module').then( m => m.FriendrequestsPageModule)
  },
  {
    path: 'userprofileother',
    loadChildren: () => import('./userprofileother/userprofileother.module').then( m => m.UserprofileotherPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
