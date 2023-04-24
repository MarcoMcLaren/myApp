import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CustomerPage implements OnInit {

  customer = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
  router: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    const customerDataString = localStorage.getItem('customer');
    if (customerDataString) {
      const customerData = JSON.parse(customerDataString);
      this.customer = customerData;
    }
  }

  updateCustomer() {
    this.customerService.updateCustomer(this.customer.name, this.customer.email, this.customer.phone, this.customer.address);
     // Navigate to the cart page
  }


}
