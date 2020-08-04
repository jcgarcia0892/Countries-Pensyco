import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Shared Module

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { InformationLayoutComponent } from './layout/information-layout/information-layout.component';



/*import { PaisesComponent } from './components/paises/paises/paises.component';
import { PaisComponent } from './components/paises/pais/pais.component';
import { PaisesVisitadosComponent } from './components/paises/paises-visitados/paises-visitados.component';
import { SearcherComponent } from './components/paises/searcher/searcher.component';
import { AboutUsComponent } from './components/paises/about-us/about-us.component';*/

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    InformationLayoutComponent,
    /*PaisesComponent,
    PaisComponent,
    PaisesVisitadosComponent,
    SearcherComponent,
    AboutUsComponent,*/
  ],
  imports: [
    BrowserModule,
    //SharedModule
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
