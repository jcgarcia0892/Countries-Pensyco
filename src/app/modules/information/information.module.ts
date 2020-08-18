import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InformationRoutingModule } from './information-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'

import { AboutUsComponent } from './page/about-us/about-us.component';
import { HotelsComponent } from './page/hotels/hotels.component';
import { DestinationsComponent } from './page/destinations/destinations.component';
import { SearcherComponent } from './page/searcher/searcher.component';
import { ShoppingCarComponent } from './page/shopping-car/shopping-car.component';


@NgModule({
    declarations: [
        AboutUsComponent,
        HotelsComponent,
        DestinationsComponent,
        SearcherComponent,
        ShoppingCarComponent
    ],
    imports: [
        SharedModule,
        InformationRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})

export class InformationModule {}