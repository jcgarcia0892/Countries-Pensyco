import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { InformationRoutingModule } from './information-routing.module';

import { AboutUsComponent } from './page/about-us/about-us.component';
import { PaisComponent } from './page/pais/pais.component';
import { PaisesComponent } from './page/paises/paises.component';
import { PaisesVisitadosComponent } from './page/paises-visitados/paises-visitados.component';
import { SearcherComponent } from './page/searcher/searcher.component';


@NgModule({
    declarations: [
        AboutUsComponent,
        PaisComponent,
        PaisesComponent,
        PaisesVisitadosComponent,
        SearcherComponent
    ],
    imports: [
        SharedModule,
        InformationRoutingModule
    ]
})

export class InformationModule {}