import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css']
})
export class Reservation implements OnInit {
  client: any = {
    nom: '',
    email: '',
    platNom: '',
    reservations: 0,
    avatar: 'assets/a2.jpg',
    total: 0,
    platsDetails: [],
    dateReservation: '',
    nbPersonnes: 1,
    numTable: ''
  };

  platsSelectionnes: any[] = [];
  errors: any = {};

  constructor(private router: Router) {
    console.log('🏗️ Composant Reservation créé');
  }

  ngOnInit() {
    console.log('🔍 Initialisation du composant Reservation');
    this.chargerPlatsSelectionnes();
  }

  private chargerPlatsSelectionnes() {
    console.log('📥 Chargement des plats depuis localStorage...');
    
    try {
      const reservationData = localStorage.getItem('reservation-en-cours');
      console.log('📦 Données brutes du localStorage:', reservationData);
      
      if (reservationData) {
        const data = JSON.parse(reservationData);
        console.log('📊 Données parsées:', data);
        
        this.platsSelectionnes = data.plats || [];
        this.client.total = data.total || 0;
        
        console.log('🍽️ Plats chargés:', this.platsSelectionnes);
        console.log('💰 Total chargé:', this.client.total);
        
        // Construire la description des plats
        if (this.platsSelectionnes.length > 0) {
          this.client.platNom = this.getPlatsDescription(this.platsSelectionnes);
          this.client.platsDetails = this.platsSelectionnes.map((item: any) => 
            `${item.plat.nom} x${item.quantity}`
          );
          console.log('✅ Plats chargés avec succès');
        } else {
          this.client.platNom = 'Aucun plat sélectionné';
          console.log('❌ Aucun plat dans les données');
        }
      } else {
        this.client.platNom = 'Aucune réservation en cours';
        console.log('❌ Aucune donnée trouvée dans le localStorage');
      }
    } catch (error) {
      console.error('💥 Erreur lors du chargement des plats:', error);
      this.client.platNom = 'Erreur de chargement des plats';
    }
  }

  private getPlatsDescription(plats: any[]): string {
    if (plats.length === 0) return 'Aucun plat sélectionné';
    
    const descriptions = plats.map(item => 
      `${item.plat.nom} x${item.quantity}`
    );
    return descriptions.join(', ');
  }

  validerReservation() {
    console.log('📋 Validation de la réservation...');
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

    // Validation des plats
    if (this.platsSelectionnes.length === 0) {
      this.errors.plats = 'Veuillez sélectionner au moins un plat. Revenez à la sélection.';
    }

    // Si erreurs, on stoppe ici
    if (Object.keys(this.errors).length > 0) {
      console.log('❌ Erreurs de validation:', this.errors);
      return;
    }

    // Préparer le client
    const nouveauClient = {
      nom: this.client.nom,
      email: this.client.email,
      platNom: this.client.platNom,
      reservations: 1,
      avatar: 'assets/a2.jpg',
      dateReservation: new Date().toLocaleString('fr-FR'),
      total: this.client.total,
      platsDetails: this.client.platsDetails,
      nbPersonnes: this.client.nbPersonnes,
      numTable: this.client.numTable
    };

    console.log('👤 Nouveau client à ajouter:', nouveauClient);

    // Ajouter le client au localStorage
    this.ajouterClient(nouveauClient);

    // Nettoyer la réservation en cours
    localStorage.removeItem('reservation-en-cours');

    // Rediriger vers la page des clients
    console.log('🔄 Redirection vers /clients');
    this.router.navigate(['/clients']);
  }

  private ajouterClient(client: any): void {
    try {
      const clients = this.getClientsFromStorage();
      clients.push(client);
      localStorage.setItem('restaurant-clients', JSON.stringify(clients));
      localStorage.setItem('new-reservation', 'true');
      console.log('✅ Client ajouté avec succès');
    } catch (error) {
      console.error('💥 Erreur lors de l\'ajout du client:', error);
    }
  }

  private getClientsFromStorage(): any[] {
    try {
      const clients = localStorage.getItem('restaurant-clients');
      return clients ? JSON.parse(clients) : [];
    } catch (error) {
      console.error('💥 Erreur lors de la récupération des clients:', error);
      return [];
    }
  }

  // Méthode pour retourner à la sélection des plats
  modifierPlats() {
    console.log('🔄 Retour à la sélection des plats');
    this.router.navigate(['/reserv-tab']);
  }

  // Méthode pour debug
  debugLocalStorage() {
    console.log('🔍 Debug localStorage:');
    console.log('reservation-en-cours:', localStorage.getItem('reservation-en-cours'));
    console.log('restaurant-clients:', localStorage.getItem('restaurant-clients'));
    
    // Afficher une alerte avec les données
    const reservationData = localStorage.getItem('reservation-en-cours');
    if (reservationData) {
      alert('Données dans reservation-en-cours:\n' + reservationData);
    } else {
      alert('Aucune donnée dans reservation-en-cours');
    }
  }
}