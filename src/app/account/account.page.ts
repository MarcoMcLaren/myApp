import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { Order } from '../order';
import { CartService } from '../service/cart.service';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { HistoryService } from '../service/history.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [ModalController]
})
export class AccountPage implements OnInit {

  orders: Order[] = [];
  customer: any = {};
  orderHistory: any[] = [];

  @ViewChild('helpModal') helpModal: any;

  constructor(private modalCtrl: ModalController,private cartService: CartService, private router: Router, private customerService: CustomerService, private historyService: HistoryService) {}

  ngOnInit() {
    const orderDataString = localStorage.getItem('orderData');
    if (orderDataString) {
      const orderData = JSON.parse(orderDataString);
      this.orders = orderData.orders;
    }

    this.customer = this.customerService.getCustomer();

    this.orderHistory = this.historyService.getOrderHistory();
  }

  reorder(order: Order): void {
    // Add the order to the cart
    this.cartService.addToCart([order]);

    // Navigate to the cart page
    this.router.navigateByUrl('/cart');
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

  // Update the showHelp() method
async showHelp() {
  const helpModal = await this.modalCtrl.create({
    component: ModalComponent,
    cssClass: 'help-modal'
  });
  return await helpModal.present();
}

}
