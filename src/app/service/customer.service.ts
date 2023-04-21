import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-555-5555',
    address: '123 Main St'
  };

  constructor() { }

  updateCustomer(name: string, email: string, phone: string, address: string) {
    this.customer.name = name;
    this.customer.email = email;
    this.customer.phone = phone;
    this.customer.address = address;

    localStorage.setItem('customer', JSON.stringify(this.customer));
  }

  getCustomer() {
    const customerString = localStorage.getItem('customer');
    if (customerString) {
      return JSON.parse(customerString);
    }
    return this.customer;
  }
  
}
