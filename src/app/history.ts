import { Order } from "./order";

export class History {
    orders: Order[];
  totalPrice: number;
  deliveryInstructions?: string;
 
  constructor(orders: Order[] = [], totalPrice: number = 0, deliveryInstructions: string = '') {
    this.orders = orders;
    this.totalPrice = totalPrice;
    this.deliveryInstructions = deliveryInstructions;
  }
  }