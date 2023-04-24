import { Order } from "./order";

export interface OrderData {
    orders: Order[];
    totalPrice: number;
    deliveryInstructions?: string;
  }