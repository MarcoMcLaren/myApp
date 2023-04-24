export class Order {
    restaurantId: number;
    restaurantName: string;
    dishName: string;
    price: number;
    quantity: number;
    image: string;
    deliveryInstructions?: string;
  
    constructor(
      restaurantId: number,
      restaurantName: string,
      dishName: string,
      price: number,
      quantity: number,
      image: string,
      deliveryInstructions?: string,
     
  
    ) {
      this.restaurantId = restaurantId;
      this.restaurantName = restaurantName;
      this.dishName = dishName;
      this.price = price;
      this.quantity = quantity;
      this.image = image;
      this.deliveryInstructions = deliveryInstructions;
    }

  }