import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './component/footer/footer.component';
import { MenuComponent } from './component/menu/menu.component';
import { CardComponent } from './component/card/card.component';


@NgModule({
    declarations: [
        FooterComponent,
        MenuComponent,
        CardComponent,
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    providers: [],
    exports: [
        //modules
        CommonModule,
        //Components
        FooterComponent,
        MenuComponent,
        CardComponent,
    ]
})

export class SharedModule {}

