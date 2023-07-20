import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AccessComponent } from './pages/access/access.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfigResolver } from './core/resolvers/config.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      config: ConfigResolver,
    },
    data: { animation: 'isLeft' },
  },
  {
    path: 'auth',
    component: AccessComponent,
    resolve: {
      config: ConfigResolver,
    },
    children: [
      {
        path: 'login',
        component: LoginComponent,
        // data: { animation: 'isRight' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { animation: 'isRight' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
