import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Order } from '../order';
import { CartService } from '../service/cart.service';
import { HistoryService } from '../service/history.service';
import { OrderData } from '../orderData';

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

  constructor(private cartService: CartService, private historyService: HistoryService) {}

  ngOnInit() {
    this.cartService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  deleteOrder(index: number): void {
    this.cartService.deleteOrder(index);
    this.orders = this.orders.filter((order, i) => i !== index);
  }

  calculateTotal(): number {
    return this.orders.reduce((total, order) => total + (order.price * order.quantity), 0);
  }

  makePayment(): void {
    // Calculate the total price
    const totalPrice = this.calculateTotal() + 5;
  
    // Create an object that conforms to the OrderData interface
    const orderData: OrderData = {
      orders: this.orders,
      totalPrice: totalPrice,
      deliveryInstructions: this.deliveryInstructions
    };
  
    // Save the order data to local storage
    localStorage.setItem('orderData', JSON.stringify(orderData));
  
    // Add the order data to the order history
    this.historyService.addOrderHistory(orderData);
  
    // Show a modal pop-up indicating successful payment
    alert('Payment Successful!');
  }
}
