import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Order } from '../order';
import { CartService } from '../service/cart.service';



@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AccountPage implements OnInit {

  orders: Order[] = [];

  constructor(private cartService: CartService) { this.cartService = cartService;}

  ngOnInit() {
    const orderDataString = localStorage.getItem('orderData');
    if (orderDataString) {
      const orderData = JSON.parse(orderDataString);
      this.orders = orderData.orders;
    }
  }

  reorder(order: Order): void {
    // Add the order to the cart
    this.cartService.addToCart([order]);
  
    // Navigate to the cart page
    window.location.href = '/search';
  }

  calculateTotalCost(): number {
    let totalCost = 0;
    this.orders.forEach((order) => {
      totalCost += order.price;
    });
    return totalCost + 5;
  }
}
