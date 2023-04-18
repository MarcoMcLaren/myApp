import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Restaurant } from '../restaurants';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  restaurants: Restaurant[] = [];
  
  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants;
    });
  }
   
}
