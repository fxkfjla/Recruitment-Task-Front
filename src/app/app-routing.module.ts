import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { FormScreenComponent } from './components/form-screen/form-screen.component';
import { ListScreenComponent } from './components/list-screen/list-screen.component';

const routes: Routes = [
  {path: '', component: StartScreenComponent},
  {path: 'form', component: FormScreenComponent},
  {path: 'list', component: ListScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
