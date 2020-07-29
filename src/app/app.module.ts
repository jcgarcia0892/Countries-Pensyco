import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { PaisesComponent } from './components/paises/paises/paises.component';
import { PaisComponent } from './components/paises/pais/pais.component';
import { PaisesVisitadosComponent } from './components/paises/paises-visitados/paises-visitados.component';
import { SearcherComponent } from './components/paises/searcher/searcher.component';
import { AboutUsComponent } from './components/paises/about-us/about-us.component';
import { FooterComponent } from './components/shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PaisesComponent,
    PaisComponent,
    PaisesVisitadosComponent,
    SearcherComponent,
    AboutUsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
