import { Injectable } from '@angular/core';
import { Order } from '../order';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private orders: Order[] = [];

  constructor() {
    // Retrieve the orders array from local storage
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      this.orders = JSON.parse(storedOrders);
    } else {
      // Save the default orders array to local storage
      localStorage.setItem('orders', JSON.stringify(this.orders));
    }
  }

  // Get the orders array
  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  // Add new orders to the orders array
  addToCart(newOrders: Order[]): void {
    for (const newOrder of newOrders) {
      // Check if the restaurant already exists in the cart
      const index = this.orders.findIndex((o) => o.restaurantName === newOrder.restaurantName && o.dishName === newOrder.dishName);
      if (index !== -1) {
        // If the restaurant already exists, increment the quantity of the corresponding dish for the specified order
        this.orders[index].quantity += newOrder.quantity;
      } else {
        // If the restaurant does not exist, add the new order to the cart
        this.orders.push(newOrder);
      }
    }
    // Save the updated orders array to local storage
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  // Delete an order from the orders array
  deleteOrder(index: number): void {
    this.orders.splice(index, 1);
    // Save the updated orders array to local storage
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  calculateTotal(deliveryFee: number): number {
    let totalPrice = 0;
    for (const order of this.orders) {
      totalPrice += order.price * order.quantity;
    }
    totalPrice += deliveryFee;
    return totalPrice;
  }
}
