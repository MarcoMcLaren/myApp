import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Order } from '../order';
import { CartService } from '../service/cart.service';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class CartPage implements OnInit {
  orders: Order[] = [];
  deliveryInstructions: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  deleteOrder(index: number): void {
    this.cartService.deleteOrder(index);
    this.orders.splice(index, 1);
  }

  calculateTotal(): number {
    return this.orders.reduce((total, order) => total + (order.price * order.quantity), 0);
  }

  makePayment(): void {
    // Calculate the total price
    const totalPrice = this.calculateTotal() + 5;

    // Create an object that contains the order and total price
    const orderData = {
      orders: this.orders,
      totalPrice: totalPrice
    };

    // Save the order data to local storage
    localStorage.setItem('orders', JSON.stringify(this.orders));

    // Show a modal pop-up indicating successful payment
    alert('Payment Successful!');
  }
}
