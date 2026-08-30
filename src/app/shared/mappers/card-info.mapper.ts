import { CardComponentInfo } from '../interfaces/card-component-info.interface';
import { Destination } from '../interfaces/destination.interface';
import { Hotel } from '../interfaces/hotel.interface';

export class CardInfoMapper {
  static fromDestination(destination: Destination): CardComponentInfo {
    return {
      img: {
        src: destination.img,
        alt: destination.city,
        title: destination.city
      },
      actions: {
        icon: null,
        title: 'Go to Hotels',
        route: ['/information/hotels', destination.city]
      }
    };
  }

  static fromHotel(hotel: Hotel): CardComponentInfo {
    return {
      img: {
        src: hotel.img,
        alt: hotel.name,
        title: hotel.name
      },
      actions: {
        icon: 'fa fa-shopping-cart',
        title: 'Add to cart',
        route: ['/information/shopping']
      }
    };
  }
}
