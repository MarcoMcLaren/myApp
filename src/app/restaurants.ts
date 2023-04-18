export class Restaurant {
    id: number;
    name: string;
    type: string;
    ratings: number;
    distance: string;
    price: number;
    image: string;
  
    constructor(id:number, name: string, type: string, ratings: number, distance: string, price: number, image: string) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.ratings = ratings || 0; // Initialize ratings to 0 if no value is provided
      this.distance = distance;
      this.price = price;
      this.image = image;
    }
  }