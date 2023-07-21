import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { FormScreenComponent } from './form-screen/form-screen.component';
import { ListScreenComponent } from './list-screen/list-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    FormScreenComponent,
    ListScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
