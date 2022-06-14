import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorListComponent } from "./components/sensor-list/sensor-list.component";
import { SensorRegisterComponent } from './components/sensor-register/sensor-register.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorListComponent } from './components/error-list/error-list.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path: 'sensorList', component: SensorListComponent, canActivate: [AuthGuard]},
  {path: 'sensorRegister', component: SensorRegisterComponent, canActivate: [AuthGuard]},
  {path: 'graphs', component: GraphsComponent, canActivate: [AuthGuard]},
  {path: 'errorList', component: ErrorListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
