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
    resolve: {
      config: ConfigResolver,
    },
    children: [
      {
        path: '',
        component: HomeComponent, 
        data: { animation: 'home' },
      },
      {
        path: 'auth',
        component: AccessComponent, 
        children: [
          {
            path: 'login',
            component: LoginComponent,
            data: { animation: 'login' },
          },
          {
            path: 'register',
            component: RegisterComponent,
            data: { animation: 'register' },
          },
        ],
        data: {animation: 'auth'}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
