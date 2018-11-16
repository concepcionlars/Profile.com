import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CenterBarComponent } from './main/center-bar/center-bar.component';
import { RightsideBarComponent } from './main/rightside-bar/rightside-bar.component';
import { LeftsideBarComponent } from './main/leftside-bar/leftside-bar.component';
import { NewsfeedComponent } from './main/center-bar/newsfeed/newsfeed.component';
import { WritepostComponent } from './main/center-bar/writepost/writepost.component';
import { NavComponent } from './nav/nav.component';
import { DeleteDirective } from './main/center-bar/writepost/delete.directive';
import { DeleteIconDirective } from './main/center-bar/writepost/delete-icon.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CenterBarComponent,
    RightsideBarComponent,
    LeftsideBarComponent,
    NewsfeedComponent,
    WritepostComponent,
    NavComponent,
    DeleteDirective,
    DeleteIconDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
