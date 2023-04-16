import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CardComponentInfo } from '../../interfaces/card-component-info.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    'class': 'package-card'
  },
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {

  @Input() info: CardComponentInfo = {
    img: {
      src: '',
      alt: '',
      title: ''
    },
    actions: {
      title: '',
      route: [],
      icon: null
    }
  };

  @Output() cardButtonAction = new EventEmitter<void>();

}
