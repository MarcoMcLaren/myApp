import { Injectable } from '@angular/core';
import { OrderData } from '../orderData';
import { History } from '../history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private history: History[] = [];

  constructor() {}

  addOrderHistory(orderData: OrderData): void {
    const historyItem = new History(orderData.orders, orderData.totalPrice, orderData.deliveryInstructions);
    this.history.push(historyItem);
    localStorage.setItem('orderHistory', JSON.stringify(this.history));
  }

  getOrderHistory(): History[] {
    const orderHistoryString = localStorage.getItem('orderHistory');
    if (orderHistoryString) {
      this.history = JSON.parse(orderHistoryString);
    }
    return this.history;
  }

  clearOrderHistory(): void {
    this.history = [];
    localStorage.removeItem('orderHistory');
  }
}
