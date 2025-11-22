import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client.html',
  styleUrls: ['./client.css']
})
export class Client implements OnInit {
  clients: any[] = [];
  showWelcomeMessage = false;

  ngOnInit() {
    this.loadClients();
    
    // Vérifier s'il y a une nouvelle réservation
    const newReservation = localStorage.getItem('new-reservation');
    if (newReservation) {
      this.showWelcomeMessage = true;
      localStorage.removeItem('new-reservation');
      
      // Cacher le message après 5 secondes
      setTimeout(() => {
        this.showWelcomeMessage = false;
      }, 5000);
    }
  }

  private loadClients(): void {
    const savedClients = localStorage.getItem('restaurant-clients');
    if (savedClients) {
      this.clients = JSON.parse(savedClients);
    } else {
      // Clients initiaux par défaut avec Pierre
      this.clients = [
        {
          nom: 'Marie Dupont',
          email: 'marie.dupont@email.com',
          platNom: 'Café Latte Artisan',
          reservations: 5,
          avatar: 'assets/a2.jpg',
          dateReservation: '19/11/2024, 20:45:30',
          total: 3.5
        },
        {
          nom: 'Jean Martin',
          email: 'jean.martin@email.com',
          platNom: 'Sandwich Gourmet',
          reservations: 3,
          avatar: 'assets/a2.jpg',
          dateReservation: '18/11/2024, 19:30:15',
          total: 5.5
        },
        {
          nom: 'Sophie Lambert',
          email: 'sophie.lambert@email.com',
          platNom: 'Croissant Beurré',
          reservations: 7,
          avatar: 'assets/a2.jpg',
          dateReservation: '17/11/2024, 14:20:45',
          total: 2.5
        },
        {
          nom: 'Pierre Moreau',
          email: 'pierre.moreau@email.com',
          platNom: 'Tarte du Jour + Café',
          reservations: 2,
          avatar: 'assets/a2.jpg',
          dateReservation: '19/11/2024, 21:15:20',
          total: 8.5
        }
      ];
      this.saveClients();
    }
  }

  private saveClients(): void {
    localStorage.setItem('restaurant-clients', JSON.stringify(this.clients));
  }
}