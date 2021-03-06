import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './page/about-us/about-us.component';
import { HotelsComponent } from './page/hotels/hotels.component';
import { DestinationsComponent } from './page/destinations/destinations.component';
import { ShoppingCarComponent } from './page/shopping-car/shopping-car.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
            path: 'about',
            component: AboutUsComponent
        },
        {
            path: 'hotels/:name',
            component: HotelsComponent
        },
        {
            path:'destinations',
            component: DestinationsComponent
        },
        {
            path:'shopping',
            component: ShoppingCarComponent
        }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InformationRoutingModule {}