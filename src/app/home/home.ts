import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  bienvenueMessage = "Bienvenue au Café Gourmet ☕🍪";
  description = "Découvrez nos plats savoureux et réservez facilement votre table.";

  plats = [
    { nom: 'Café Latte Artisan', prix: 4.5, image: 'assets/cafe-latte.jpg' },
    { nom: 'Croissant Beurré', prix: 2.5, image: 'assets/croissant.jpg' },
    { nom: 'Sandwich Gourmet', prix: 6.5, image: 'assets/sandwich.jpg' },
    { nom: 'Tarte du Jour', prix: 5.0, image: 'assets/tarte.jpg' }
  ];

}
