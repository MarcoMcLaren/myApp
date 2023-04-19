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
    const totalPrice = this.calculateTotal() + 50;

    // Save the order and total price to local storage
    localStorage.setItem('order', JSON.stringify(this.orders));
    localStorage.setItem('totalPrice', totalPrice.toString());

    // Show a modal pop-up indicating successful payment
    alert('Payment Successful!');
  }
}