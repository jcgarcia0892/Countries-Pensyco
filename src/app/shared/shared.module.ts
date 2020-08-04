import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './component/footer/footer.component';
import { MenuComponent } from './component/menu/menu.component';//esta es la pagina del home hay que moverla


@NgModule({
    declarations: [
        FooterComponent,
        MenuComponent
    ],
    imports: [
        RouterModule
    ],
    providers: [],
    exports: [
        //modules
        //Components
        FooterComponent,
        MenuComponent
    ]
})

export class SharedModule {}

