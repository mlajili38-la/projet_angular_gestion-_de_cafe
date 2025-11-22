import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chef',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chef.html',
  styleUrls: ['./chef.css']
})
export class ChefComponent {
  activeChef: any = null;

  chefs = [
    { 
      fullName: 'Chef Marco', 
      designation: 'Executive Chef',
      specialty: 'Cuisine Française',
      email: 'marco@restoran.com',
      phone: '+33 1 23 45 67 89',
      image: 'assets/c1.jpg'
    },
    { 
      fullName: 'Chef Sophie', 
      designation: 'Pastry Chef',
      specialty: 'Pâtisserie',
      email: 'sophie@restoran.com',
      phone: '+33 1 23 45 67 90',
      image: 'assets/c2.jpg'
    },
    { 
      fullName: 'Chef Antoine', 
      designation: 'Sous Chef',
      specialty: 'Poissons',
      email: 'antoine@restoran.com',
      phone: '+33 1 23 45 67 91',
      image: 'assets/c3.jpg'
    },
    { 
      fullName: 'Chef Elena', 
      designation: 'Sauce Chef',
      specialty: 'Sauces',
      email: 'elena@restoran.com',
      phone: '+33 1 23 45 67 92',
      image: 'assets/c4.jpg'
    }
  ];

  setActiveChef(chef: any) {
    this.activeChef = chef;
  }
}