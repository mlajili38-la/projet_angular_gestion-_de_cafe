import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  categories = [
    { nom: 'Sandwich', image: '/assets/sandwich.jpg', id: 'sandwich' },
    { nom: 'Café', image: '/assets/cafe.jpg', id: 'cafe' },
    { nom: 'Tarte', image: '/assets/tarte.jpg', id: 'tarte' },
    { nom: 'Thé', image: '/assets/the.jpg', id: 'the' },
    { nom: 'Boissons', image: '/assets/boisson.jpg', id: 'boisson' },
    { nom: 'Brunch', image: '/assets/brunch.jpg', id: 'brunch' } // 🍳 ajouté
  ];
}
