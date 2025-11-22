import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-simple',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservation-simple.html',
  styleUrls: ['./reservation-simple.css']
})
export class ReservationSimple implements OnInit {
  client: any = {
    nom: '',
    email: '',
    platNom: '',
    prix: 0,
    quantity: 1
  };

  platSelectionne: any = null;
  errors: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.chargerPlatSelectionne();
  }

  private chargerPlatSelectionne() {
    const reservationData = localStorage.getItem('reservation-simple');
    
    if (reservationData) {
      const data = JSON.parse(reservationData);
      this.platSelectionne = data.plat;
      this.client.platNom = data.plat.nom;
      this.client.prix = data.plat.prix;
      this.client.quantity = data.quantity;
    } else {
      this.router.navigate(['/menu']);
    }
  }

  validerReservation() {
    this.errors = {};

    // Validation du nom
    if (!this.client.nom.trim()) {
      this.errors.nom = 'Le nom est obligatoire.';
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.client.email.trim() || !emailRegex.test(this.client.email)) {
      this.errors.email = 'Email invalide (ex: exemple@mail.com).';
    }

    if (Object.keys(this.errors).length > 0) return;

    // Préparer le client
    const nouveauClient = {
      nom: this.client.nom,
      email: this.client.email,
      platNom: `${this.client.platNom} x${this.client.quantity}`,
      reservations: 1,
      avatar: 'assets/a2.jpg',
      dateReservation: new Date().toLocaleString('fr-FR'),
      total: this.client.prix * this.client.quantity,
      platsDetails: [`${this.client.platNom} x${this.client.quantity}`]
    };

    // Ajouter le client au localStorage
    this.ajouterClient(nouveauClient);

    // Nettoyer la réservation
    localStorage.removeItem('reservation-simple');

    // Rediriger vers la page des clients
    this.router.navigate(['/clients']);
  }

  private ajouterClient(client: any): void {
    const clients = this.getClientsFromStorage();
    clients.push(client);
    localStorage.setItem('restaurant-clients', JSON.stringify(clients));
    localStorage.setItem('new-reservation', 'true');
  }

  private getClientsFromStorage(): any[] {
    const clients = localStorage.getItem('restaurant-clients');
    return clients ? JSON.parse(clients) : [];
  }

  modifierQuantite(increment: number) {
    this.client.quantity = Math.max(1, this.client.quantity + increment);
  }

  annuler() {
    localStorage.removeItem('reservation-simple');
    this.router.navigate(['/menu']);
  }
}