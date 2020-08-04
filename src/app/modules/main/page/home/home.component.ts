import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	appear:number = 0;

  constructor() {

  		setTimeout(()=>{
  			return this.appear = 1;
  		}, 1000);


   }

  ngOnInit() {
  }

}