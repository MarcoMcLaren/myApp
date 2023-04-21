import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Order } from '../order';
import { CartService } from '../service/cart.service';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../customer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AccountPage implements OnInit {

  orders: Order[] = [];
  customer: any = {};

  constructor(private cartService: CartService, private router: Router, private customerService: CustomerService) {}

  ngOnInit() {
    const orderDataString = localStorage.getItem('orderData');
    if (orderDataString) {
      const orderData = JSON.parse(orderDataString);
      this.orders = orderData.orders;
    }

    this.customer = this.customerService.getCustomer();
  }

  reorder(order: Order): void {
    // Add the order to the cart
    this.cartService.addToCart([order]);
  
    // Navigate to the cart page
    this.router.navigateByUrl('/search');
  }

  calculateTotalCost(): number {
    let totalCost = 0;
    this.orders.forEach((order) => {
      totalCost += order.price;
    });
    return totalCost + 5;
  }

  editCustomer(): void {
    // Navigate to the customer page to edit the customer details
    this.router.navigateByUrl('/customer');
  }
}
