import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Order } from '../order';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AccountPage implements OnInit {

  orders: Order[] = [];

  constructor() { }

  ngOnInit() {
  
    const orderDataString = localStorage.getItem('orderData');
    if (orderDataString) {
      const orderData = JSON.parse(orderDataString);
      this.orders = orderData.orders;
  
      // Calculate the total cost of each order
      this.orders.forEach((order) => {
        order.price = order.price * order.quantity;
      });
    }
  }
  
  reorder(order: Order): void {
    // Set the order in the cart and navigate to the cart page
    localStorage.setItem('orders', JSON.stringify([order]));
    window.location.href = '/cart';
  }

}
