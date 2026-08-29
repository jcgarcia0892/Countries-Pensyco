import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information-layout',
  templateUrl: './information-layout.component.html',
  styleUrls: ['./information-layout.component.scss'],
  standalone: false
})
export class InformationLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onActivate(event: any){
    window.scroll(0,0);
  }

}
