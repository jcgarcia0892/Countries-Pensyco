export interface CardComponentInfo {
    img: {
        src: string;
        alt: string;
        title: string;
      },
    actions: {
        title: string;
        route: string[];
        icon: null | string;
    }
}