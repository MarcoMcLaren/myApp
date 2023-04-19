import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Restaurant } from '../restaurants';
import { RestaurantService } from '../service/restaurant.service';
import { CartService } from '../service/cart.service';
import { Order } from '../order';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {
  searchText: string ="";
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService
  ) { this.filteredRestaurants = [];}

  

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants;
      this.filteredRestaurants = restaurants;
    });
  }

  addToCart(restaurant: Restaurant): void {
    const order: Order = {
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      dishName: restaurant.type,
      quantity: 1,
      price: restaurant.price,
      image: restaurant.image
    };
    this.cartService.addToCart(order);
    console.log(order);
  }

  filterRestaurants(): void {
    if (this.searchText.trim() !== '') {
      this.filteredRestaurants = this.restaurants.filter((restaurant) => {
        return (
          restaurant.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          restaurant.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
          restaurant.ratings.toString().includes(this.searchText) ||
          restaurant.distance.toLowerCase().includes(this.searchText.toLowerCase()) ||
          restaurant.price.toString().includes(this.searchText)
        );
      });
    } else {
      this.filteredRestaurants = [];
    }
  }

  onSearchChange(event: any): void {
    this.searchText = event.target.value;
    this.filterRestaurants();
  }
}
