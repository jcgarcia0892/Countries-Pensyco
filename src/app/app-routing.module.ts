import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { InformationLayoutComponent } from './layout/information-layout/information-layout.component';

const routes: Routes = [
 
  {
    path: 'main',
    component: MainLayoutComponent,
    //canActivate: [ /*AuthGuard*/ ],
    loadChildren:() => import('./modules/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'information',
    component: InformationLayoutComponent,
   //canActivate: [ /*NoAuthGuard*/ ],
    loadChildren: () => import('./modules/information/information.module').then(m => m.InformationModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/*import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './shared/component/menu/menu.component';

import { PaisesComponent } from './components/paises/paises/paises.component';
import { PaisComponent } from './components/paises/pais/pais.component';
import { SearcherComponent } from './components/paises/searcher/searcher.component';
import { AboutUsComponent } from './components/paises/about-us/about-us.component';


const routes: Routes = [
	{path: 'menu', component: MenuComponent},
	{path: 'countries', component: PaisesComponent},
	{path: 'about', component: AboutUsComponent},
	{path: 'country/:name', component: PaisComponent},
	{path: 'searcher', component: SearcherComponent},
	{path: '**', pathMatch: 'full', redirectTo: 'menu'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {	
	
	
	
}
*/
