import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Interface pour typer les plats
interface Plat {
  id: number;
  nom: string;
  categorie: string;
  prix: number;
  description: string;
  image: string;
}

// Interface pour typer la réservation avec quantités
interface Reservation {
  nom: string;
  email: string;
  nbPersonnes: number;
  numTable: string;
  platsQuantites: Map<number, number>;
}

@Component({
  selector: 'app-reserv-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserv_tab.html',
  styleUrls: ['./reserv-tab.css'],
})
export class ReservTab implements OnInit {
  plats: Plat[] = [
    { id: 1, nom: 'Sandwich Jambon', categorie: 'sandwich', prix: 5, description: 'Jambon, fromage, salade fraîche.', image: '/assets/sandwich-jambon.jpg' },
    { id: 2, nom: 'Sandwich Poulet', categorie: 'sandwich', prix: 5.5, description: 'Poulet grillé et sauce moutarde.', image: '/assets/sandwich-poulet.jpg' },
    // ... (votre liste complète de plats)
  ];  

  categories: string[] = ['sandwich', 'tarte', 'cafe', 'boisson', 'the', 'petit-dejeuner', 'brunch'];
  selectedCategory: string = 'all';
  filteredPlats: Plat[] = [];

  reservation: Reservation = {
    nom: '',
    email: '',
    nbPersonnes: 1,
    numTable: '',
    platsQuantites: new Map<number, number>()
  };

  errors: any = {};
  showConfirmation = false;
  reservationConfirmation: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.filterByCategory('all');
  }

  // Filtrer les plats par catégorie
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredPlats = [...this.plats];
    } else {
      this.filteredPlats = this.plats.filter(plat => plat.categorie === category);
    }
  }

  // Augmenter la quantité d'un plat
  increaseQuantity(plat: Plat): void {
    const currentQuantity = this.reservation.platsQuantites.get(plat.id) || 0;
    this.reservation.platsQuantites.set(plat.id, currentQuantity + 1);
  }

  // Diminuer la quantité d'un plat
  decreaseQuantity(plat: Plat): void {
    const currentQuantity = this.reservation.platsQuantites.get(plat.id) || 0;
    if (currentQuantity > 1) {
      this.reservation.platsQuantites.set(plat.id, currentQuantity - 1);
    } else {
      this.reservation.platsQuantites.delete(plat.id);
    }
  }

  // Obtenir la quantité d'un plat
  getPlatQuantity(plat: Plat): number {
    return this.reservation.platsQuantites.get(plat.id) || 0;
  }

  // Supprimer complètement un plat
  removePlat(plat: Plat): void {
    this.reservation.platsQuantites.delete(plat.id);
  }

  // Obtenir le nombre total d'articles sélectionnés
  getTotalSelectedItems(): number {
    let total = 0;
    this.reservation.platsQuantites.forEach(quantity => {
      total += quantity;
    });
    return total;
  }

  // Obtenir les plats sélectionnés avec leurs quantités
  getSelectedPlatsWithQuantities(): any[] {
    const selected: any[] = [];
    this.reservation.platsQuantites.forEach((quantity, platId) => {
      if (quantity > 0) {
        const plat = this.plats.find(p => p.id === platId);
        if (plat) {
          selected.push({
            plat: plat,
            quantity: quantity
          });
        }
      }
    });
    return selected;
  }

  // Calculer le total
  calculateTotal(): number {
    let total = 0;
    this.reservation.platsQuantites.forEach((quantity, platId) => {
      const plat = this.plats.find(p => p.id === platId);
      if (plat) {
        total += plat.prix * quantity;
      }
    });
    return total;
  }

  // Ajouter un client à la liste
  private addClientToStorage(nouveauClient: any): void {
    const clients = this.getClientsFromStorage();
    clients.push(nouveauClient);
    localStorage.setItem('restaurant-clients', JSON.stringify(clients));
    localStorage.setItem('new-reservation', 'true');
    console.log('✅ Client ajouté au localStorage:', nouveauClient);
  }

  // Récupérer les clients du localStorage
  private getClientsFromStorage(): any[] {
    const clients = localStorage.getItem('restaurant-clients');
    return clients ? JSON.parse(clients) : [];
  }

  // MÉTHODE PRINCIPALE DE VALIDATION
  validerReservation(): void {
    console.log('🔄 Début de la validation de réservation');
    
    this.errors = {};

    // Validation des champs de base
    if (!this.reservation.nom?.trim()) {
      this.errors.nom = "Le nom est obligatoire";
    }
    
    if (!this.reservation.email?.trim() || !this.reservation.email.includes('@')) {
      this.errors.email = "Email invalide";
    }
    
    if (!this.reservation.nbPersonnes || this.reservation.nbPersonnes < 1) {
      this.errors.nbPersonnes = "Nombre de personnes invalide";
    }
    
    if (!this.reservation.numTable?.trim()) {
      this.errors.numTable = "Numéro de table obligatoire";
    }
    
    // Validation des plats
    if (this.getTotalSelectedItems() === 0) {
      this.errors.plats = "Veuillez sélectionner au moins un plat";
    }

    // Si erreurs, on arrête
    if (Object.keys(this.errors).length > 0) {
      console.error('❌ Erreurs de validation:', this.errors);
      return;
    }

    console.log('✅ Validation réussie, préparation des données...');

    // Préparer le résumé de la réservation
    const selectedPlats = this.getSelectedPlatsWithQuantities();
    const total = this.calculateTotal();
    const dateReservation = new Date().toLocaleString('fr-FR');

    const reservationSummary = {
      client: {
        nom: this.reservation.nom,
        email: this.reservation.email
      },
      table: this.reservation.numTable,
      nbPersonnes: this.reservation.nbPersonnes,
      plats: selectedPlats,
      total: total,
      date: dateReservation
    };

    console.log('📋 Résumé de réservation:', reservationSummary);

    // Ajouter le client au localStorage
    const nouveauClient = {
      id: Date.now(), // ID unique
      nom: this.reservation.nom,
      email: this.reservation.email,
      platNom: this.getPlatsDescription(selectedPlats),
      reservations: 1,
      avatar: '/assets/a2.jpg',
      dateReservation: dateReservation,
      total: total,
      platsDetails: selectedPlats.map(item => `${item.plat.nom} x${item.quantity}`),
      table: this.reservation.numTable,
      nbPersonnes: this.reservation.nbPersonnes,
      statut: 'actif'
    };

    console.log('👤 Nouveau client à ajouter:', nouveauClient);

    this.addClientToStorage(nouveauClient);

    // Afficher la confirmation
    this.reservationConfirmation = reservationSummary;
    this.showConfirmation = true;

    console.log('✅ Confirmation affichée, redirection dans 5 secondes...');

    // Redirection automatique après 5 secondes
    setTimeout(() => {
      console.log('🔄 Redirection automatique vers /clients');
      this.router.navigate(['/clients']);
    }, 5000);
  }

  private getPlatsDescription(plats: any[]): string {
    if (plats.length === 0) return 'Aucun plat';
    if (plats.length === 1) {
      return `${plats[0].plat.nom} x${plats[0].quantity}`;
    }
    return `${plats.length} plats différents`;
  }

  allerVersClients() {
    console.log('🔄 Redirection manuelle vers /clients');
    this.router.navigate(['/clients']);
  }

  faireUneNouvelleReservation() {
    console.log('🔄 Nouvelle réservation');
    this.showConfirmation = false;
    this.reservationConfirmation = null;
    
    // Réinitialiser le formulaire
    this.reservation = {
      nom: '',
      email: '',
      nbPersonnes: 1,
      numTable: '',
      platsQuantites: new Map<number, number>()
    };
    
    // Réinitialiser les erreurs
    this.errors = {};
  }

  // SUPPRIMEZ CETTE MÉTHODE - Elle n'est pas utilisée
  // redirigerVersReservation(): void { ... }
}