import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	appear:number = 0;

  constructor() {

  		setTimeout(()=>{
  			return this.appear = 1;
  		}, 1000);


   }

  ngOnInit() {
  }

}
