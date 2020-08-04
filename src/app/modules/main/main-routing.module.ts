import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/main/home',
      pathMatch: 'full'
    },
    {
      path: '',
      children: [
        {
          path: 'home',
          component: HomeComponent
        },
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MainRoutingModule { }