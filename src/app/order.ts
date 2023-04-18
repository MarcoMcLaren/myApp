export class Order {
    restaurantId: number;
    restaurantName: string;
    dishName: string;
    price: number;
    quantity: number;
  
    constructor(
      restaurantId: number,
      restaurantName: string,
      dishName: string,
      price: number,
      quantity: number
    ) {
      this.restaurantId = restaurantId;
      this.restaurantName = restaurantName;
      this.dishName = dishName;
      this.price = price;
      this.quantity = quantity;
    }
  }