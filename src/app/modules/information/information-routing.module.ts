import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './page/about-us/about-us.component';
import { PaisComponent } from './page/pais/pais.component';
import { PaisesComponent } from './page/paises/paises.component';
import { PaisesVisitadosComponent } from './page/paises-visitados/paises-visitados.component';
import { SearcherComponent } from './page/searcher/searcher.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/information/about',
      pathMatch: 'full'
    },
    {
      path: '',
      children: [
        {
            path: 'about',
            component: AboutUsComponent
        },
        {
            path: 'pais',
            component: PaisComponent
        },
        {
            path:'paises',
            component: PaisesComponent
        },
        {
            path:'paisesVisitados',
            component: PaisesVisitadosComponent 
        },
        {
            path:'searcher',
            component: SearcherComponent 
        }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InformationRoutingModule {}