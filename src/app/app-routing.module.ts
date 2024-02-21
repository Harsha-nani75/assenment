import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { AuthguardService } from './authguard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'edit/:id', component: EditComponent ,canActivate:[AuthguardService]},
  { path: 'home', component: HomeComponent,canActivate:[AuthguardService] },
  {path:'login',component:LoginComponent},
  {path:'',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
