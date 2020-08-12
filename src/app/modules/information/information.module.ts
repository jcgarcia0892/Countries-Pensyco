import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

import { InformationRoutingModule } from './information-routing.module';

import { AboutUsComponent } from './page/about-us/about-us.component';
import { HotelsComponent } from './page/hotels/hotels.component';
import { DestinationsComponent } from './page/destinations/destinations.component';
import { PackagesComponent } from './page/packages/packages.component';
import { SearcherComponent } from './page/searcher/searcher.component';
import { ShoppingCarComponent } from './page/shopping-car/shopping-car.component';


@NgModule({
    declarations: [
        AboutUsComponent,
        HotelsComponent,
        DestinationsComponent,
        PackagesComponent,
        SearcherComponent,
        ShoppingCarComponent
    ],
    imports: [
        SharedModule,
        InformationRoutingModule,
        ReactiveFormsModule
    ]
})

export class InformationModule {}