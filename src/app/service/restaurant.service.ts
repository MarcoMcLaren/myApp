import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Restaurant } from '../restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  public restaurants: Restaurant[] = [];

  constructor() {
    // Retrieve the restaurants array from local storage
    const storedRestaurants = localStorage.getItem('restaurants');
    if (storedRestaurants) {
      this.restaurants = JSON.parse(storedRestaurants);
    } else {
      // If the restaurants array is not stored in local storage, initialize it with some default values
      this.restaurants = [
        {
          id: 1,
          name: 'KFC',
          type: 'Chicken',
          ratings: 4.5,
          distance: '5km',
          price: 10,
          image: 'assets/images/kfc.png'
        },
        {
          id: 2,
          name: 'McDonalds',
          type: 'Burgers',
          ratings: 4.0,
          distance: '6km',
          price: 12,
          image: 'assets/images/McDonalds.png'
        },
        {
          id: 3,
          name: 'Romans',
          type: 'Pizza',
          ratings: 4.2,
          distance: '3km',
          price: 8,
          image: 'assets/images/romans.jpg'
        },
        {
          id: 4,
          name: 'Rocco Mama',
          type: 'Burger',
          ratings: 4.8,
          distance: '2km',
          price: 15,
          image: 'assets/images/download.png'
        }
      ];
      // Save the default restaurants array to local storage
      localStorage.setItem('restaurants', JSON.stringify(this.restaurants));
    }
  }

  // Get the restaurants array
  getRestaurants(): Observable<Restaurant[]> {
    return of(this.restaurants);
  }

  // Add a new restaurant to the restaurants array
  addRestaurant(restaurant: Restaurant): void {
    this.restaurants.push(restaurant);
    // Save the updated restaurants array to local storage
    localStorage.setItem('restaurants', JSON.stringify(this.restaurants));
  }

  // Delete a restaurant from the restaurants array
  deleteRestaurant(index: number): void {
    this.restaurants.splice(index, 1);

    // Save the updated restaurants array to local storage
    localStorage.setItem('restaurants', JSON.stringify(this.restaurants));

  }
}
