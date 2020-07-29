import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/shared/menu/menu.component';
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
