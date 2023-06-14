import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { SETTINGS } from '@angular/fire/compat/firestore';
import { GooglebooksService } from './googlebooks/googlebooks.service';
import { HttpClientModule } from '@angular/common/http';

export const firebaseConfig = {

  apiKey: "AIzaSyBWrNy0DT9Ko7jaVl5UTHR0KrpOrLSRX8g",

  authDomain: "book-crew.firebaseapp.com",

  projectId: "book-crew",

  storageBucket: "book-crew.appspot.com",

  messagingSenderId: "878505139753",

  appId: "1:878505139753:web:5e155692fb9bd87eb0c638"


};




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig),
AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireStorageModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{ provide: SETTINGS, useValue: {} }],
  bootstrap: [AppComponent],
  
  
})

export class AppModule {}
