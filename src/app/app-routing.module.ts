import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AccessComponent } from './pages/access/access.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfigResolver } from './core/resolvers/config.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: {
    config: ConfigResolver
  } },
  {
    path: 'auth',
    component: AccessComponent,
    resolve: {
      config: ConfigResolver
    },
    children: [
      { path: 'login', component: LoginComponent, data: { animation: 'isRight' } },
      { path: 'register', component: RegisterComponent, data: { animation: 'isLeft' }},
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
