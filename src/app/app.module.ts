import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { FormScreenComponent } from './components/form-screen/form-screen.component';
import { ListScreenComponent } from './components/list-screen/list-screen.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastNoAnimationModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    FormScreenComponent,
    ListScreenComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastNoAnimationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
