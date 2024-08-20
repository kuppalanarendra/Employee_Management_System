import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'home', component:HomeComponent},
    { path: 'user', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {path:'profile',component:ProfileComponent},
  {path:'employee-add',component:EmployeeFormComponent},
  {path:'employee-list',component:EmployeeListComponent},
  {path:'update-employee/:id',component:UpdateEmployeeComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }