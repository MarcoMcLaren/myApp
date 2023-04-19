export class Order {
    restaurantId: number;
    restaurantName: string;
    dishName: string;
    price: number;
    quantity: number;
    image: string;
  
    constructor(
      restaurantId: number,
      restaurantName: string,
      dishName: string,
      price: number,
      quantity: number,
      image: string
    ) {
      this.restaurantId = restaurantId;
      this.restaurantName = restaurantName;
      this.dishName = dishName;
      this.price = price;
      this.quantity = quantity;
      this.image = image;
    }
  }