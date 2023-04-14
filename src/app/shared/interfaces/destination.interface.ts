export interface Destination {
    city: string;
    img: string;
    id: number;
    places: string[];
    hotels: Hotel[];
};

export interface Hotel {
    name: string;
    adress: string;
    qualification: string;
    img: string;
    person: number;
    price: number;
    date1?: Date;
    date2?: Date;
};