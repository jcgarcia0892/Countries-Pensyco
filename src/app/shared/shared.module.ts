import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './component/footer/footer.component';
import { MenuComponent } from './component/menu/menu.component';


@NgModule({
    declarations: [
        FooterComponent,
        MenuComponent,
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
    ]
})

export class SharedModule {}

