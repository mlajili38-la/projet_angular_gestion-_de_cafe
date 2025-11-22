import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plat-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './plat-detail.html',
  styleUrls: ['./plat-detail.css']
})
export class PlatDetail implements OnInit {
  category: string = '';
  categoryPlats: any[] = [];
  plats: any[] = [
    // 🥪 Sandwichs
    { id: 1, nom: 'Sandwich Jambon', categorie: 'sandwich', prix: 5, description: 'Jambon, fromage, salade fraîche.', image: '/assets/sandwich-jambon.jpg' },
    { id: 2, nom: 'Sandwich Poulet', categorie: 'sandwich', prix: 5.5, description: 'Poulet grillé et sauce moutarde.', image: '/assets/sandwich-poulet.jpg' },
    { id: 3, nom: 'Sandwich Thon', categorie: 'sandwich', prix: 4.8, description: 'Thon, œuf, salade, olives.', image: '/assets/sandwich-thon.jpg' },
    { id: 4, nom: 'Sandwich Végétarien', categorie: 'sandwich', prix: 4.5, description: 'Légumes grillés et feta.', image: '/assets/a1.jpg' },
    { id: 5, nom: 'Panini Fromage', categorie: 'sandwich', prix: 5.2, description: 'Panini fondant au fromage.', image: '/assets/panini.jpg' },
    { id: 6, nom: 'Wrap Poulet César', categorie: 'sandwich', prix: 6, description: 'Wrap croustillant au poulet.', image: '/assets/wrap.jpg' },
    { id: 7, nom: 'Sandwich Club', categorie: 'sandwich', prix: 6.2, description: 'Triple pain, œuf, bacon, salade.', image: '/assets/club.jpg' },
    { id: 8, nom: 'Sandwich Merguez', categorie: 'sandwich', prix: 5.8, description: 'Pain chaud et merguez épicée.', image: '/assets/merguez.jpg' },
    { id: 9, nom: 'Croque-Monsieur', categorie: 'sandwich', prix: 5.5, description: 'Pain de mie gratiné.', image: '/assets/croque.jpg' },
    { id: 10, nom: 'Burger Maison', categorie: 'sandwich', prix: 7.5, description: 'Burger artisanal avec steak frais.', image: '/assets/burger.jpg' },
    
    // 🍰 Tartes
    { id: 11, nom: 'Tarte aux Pommes', categorie: 'tarte', prix: 4.5, description: 'Pâte sablée et pommes caramélisées.', image: '/assets/tarte-pomme.jpg' },
    { id: 12, nom: 'Tarte au Citron', categorie: 'tarte', prix: 4.8, description: 'Crémeux citron et meringue dorée.', image: '/assets/tarte-citron.jpg' },
    { id: 13, nom: 'Tarte au Chocolat', categorie: 'tarte', prix: 5.2, description: 'Ganache fondante au chocolat noir.', image: '/assets/tarte-choco.jpg' },
    { id: 14, nom: 'Tarte aux Fraises', categorie: 'tarte', prix: 5, description: 'Fraises fraîches sur crème vanille.', image: '/assets/tarte-fraise.jpg' },
    { id: 15, nom: 'Tarte Flambée', categorie: 'tarte', prix: 6, description: 'Spécialité alsacienne croustillante.', image: '/assets/tarte-flambee.jpg' },
    { id: 16, nom: 'Tarte au Maroilles', categorie: 'tarte', prix: 6.5, description: 'Recette du nord au maroilles.', image: '/assets/tarte-maroilles.jpg' },
    { id: 17, nom: 'Tarte Tatin', categorie: 'tarte', prix: 5.3, description: 'Pommes caramélisées renversées.', image: '/assets/tarte-tatin.jpg' },
    { id: 18, nom: 'Tarte Framboise', categorie: 'tarte', prix: 5.4, description: 'Crème légère et framboises fraîches.', image: '/assets/tarte-framboise.jpg' },
    { id: 19, nom: 'Flamiche au Fromage', categorie: 'tarte', prix: 5.9, description: 'Tarte salée au fromage fondant.', image: '/assets/Flamiche.jpg' },
    { id: 20, nom: 'Tarte Al D\'jote', categorie: 'tarte', prix: 6, description: 'Spécialité belge gourmande.', image: '/assets/tarte-djote.jpg' },
    
    // ☕ Cafés
    { id: 21, nom: 'Café Latte', categorie: 'cafe', prix: 3.5, description: 'Café onctueux au lait chaud.', image: '/assets/cafe-latte.jpg' },
    { id: 22, nom: 'Espresso', categorie: 'cafe', prix: 2.5, description: 'Café serré pour les amateurs de goût fort.', image: '/assets/espresso.jpg' },
    { id: 23, nom: 'Cappuccino', categorie: 'cafe', prix: 3.8, description: 'Café mousseux et savoureux.', image: '/assets/cappuccino.jpg' },
    { id: 24, nom: 'Macchiato', categorie: 'cafe', prix: 3.7, description: 'Expresso surmonté d\'une mousse de lait.', image: '/assets/macchiato.jpg' },
    { id: 25, nom: 'Moka', categorie: 'cafe', prix: 4.2, description: 'Café au chocolat et lait.', image: '/assets/moka.jpg' },
    
    // 🍹 Boissons & Thés
    { id: 26, nom: 'Chocolat Chaud', categorie: 'boisson', prix: 4, description: 'Chocolat onctueux et chaud.', image: '/assets/chocolat.jpg' },
    { id: 27, nom: 'Jus d\'Orange', categorie: 'boisson', prix: 3, description: '100% pur jus pressé.', image: '/assets/jus-orange.jpg' },
    { id: 28, nom: 'Smoothie Fraise', categorie: 'boisson', prix: 4.5, description: 'Fraise, banane, lait frais.', image: '/assets/smoothie.jpg' },
    { id: 29, nom: 'Eau Minérale', categorie: 'boisson', prix: 1.5, description: 'Eau plate naturelle.', image: '/assets/eau.jpg' },
    { id: 30, nom: 'Soda', categorie: 'boisson', prix: 2.8, description: 'Boisson gazeuse fraîche.', image: '/assets/soda.jpg' },
    { id: 31, nom: 'Thé Vert', categorie: 'the', prix: 2.5, description: 'Infusion naturelle relaxante.', image: '/assets/the-vert.jpg' },
    { id: 32, nom: 'Thé Noir', categorie: 'the', prix: 2.5, description: 'Saveur intense et raffinée.', image: '/assets/the-noir.jpg' },
    
    // 🍳 Petit Déjeuner
    { id: 33, nom: 'Petit Déjeuner Enfant 1', categorie: 'petit-dejeuner', prix: 4, description: 'Céréales, lait, jus d\'orange et croissant.', image: '/assets/petitdej-enfant1.jpg' },
    { id: 34, nom: 'Petit Déjeuner Enfant 2', categorie: 'petit-dejeuner', prix: 4.5, description: 'Pancake, chocolat chaud, fruits frais.', image: '/assets/petitdej-enfant2.jpg' },
    { id: 35, nom: 'Petit Déjeuner Enfant 3', categorie: 'petit-dejeuner', prix: 4.8, description: 'Tartines, confiture, lait chaud.', image: '/assets/petitdej-enfant3.jpg' },
    
    { id: 36, nom: 'Petit Déjeuner Duo 1', categorie: 'petit-dejeuner', prix: 9.5, description: '2 cafés, croissants, jus frais, omelette.', image: '/assets/petitdej-duo1.jpg' },
    { id: 37, nom: 'Petit Déjeuner Duo 2', categorie: 'petit-dejeuner', prix: 10, description: 'Crêpes, fruits rouges, chocolat chaud.', image: '/assets/petitdej-duo2.jpg' },
    { id: 38, nom: 'Petit Déjeuner Duo 3', categorie: 'petit-dejeuner', prix: 11, description: 'Pain perdu, yaourt, café latté.', image: '/assets/petitdej-duo3.jpg' },
    { id: 39, nom: 'Brunch Solo 1', categorie: 'brunch', prix: 6, description: 'Café, croissant, jus d\'orange.', image: '/assets/brunch-solo1.jpg' },
    { id: 40, nom: 'Brunch Solo 2', categorie: 'brunch', prix: 6.5, description: 'Toast, omelette, lait chaud.', image: '/assets/brunch-solo2.jpg' },
    { id: 41, nom: 'Brunch Solo 3', categorie: 'brunch', prix: 7, description: 'Crêpe, café, fruits frais.', image: '/assets/brunch-solo3.jpg' },
  ];  

  // AJOUTEZ LE CONSTRUCTOR ICI - C'EST ESSENTIEL !
  constructor(private router: Router, private route: ActivatedRoute) {
    console.log('🔧 Composant PlatDetail créé');
  }

  // AJOUTEZ ngOnInit ICI - C'EST ESSENTIEL !
  ngOnInit() {
    console.log('🔧 Initialisation de PlatDetail');
    
    this.route.params.subscribe(params => {
      this.category = params['id'];
      console.log('📁 Catégorie sélectionnée:', this.category);
      
      this.categoryPlats = this.plats.filter(p => p.categorie === this.category);
      console.log('🍽️ Plats dans cette catégorie:', this.categoryPlats);
    });
  }

  reserver(plat: any) {
    console.log('🎯 COMMANDE - Début de la réservation');
    
    // Validation du plat
    if (!plat || !plat.id || !plat.nom) {
      console.error('❌ Plat invalide:', plat);
      alert('Erreur: Plat non valide');
      return;
    }

    console.log('🍽️ Plat sélectionné:', {
      id: plat.id,
      nom: plat.nom,
      prix: plat.prix,
      categorie: plat.categorie
    });

    // Préparation des données
    const reservationData = {
      plat: {
        id: plat.id,
        nom: plat.nom,
        prix: plat.prix,
        description: plat.description,
        image: plat.image,
        categorie: plat.categorie
      },
      quantity: 1,
      total: plat.prix,
      dateReservation: new Date().toLocaleString('fr-FR'),
      statut: 'en_attente'
    };

    console.log('💾 Données de réservation:', reservationData);

    // Sauvegarde
    try {
      localStorage.setItem('reservation-simple', JSON.stringify(reservationData));
      console.log('✅ Réservation sauvegardée');

      // REDIRECTION IMMÉDIATE SANS CONFIRMATION
      console.log('🔄 Redirection immédiate vers /reservation-simple');
      this.router.navigate(['/reservation-simple']);

    } catch (error) {
      console.error('❌ Erreur de sauvegarde:', error);
      alert('❌ Erreur lors de la réservation. Vérifiez la console.');
    }
  }

  testCommande() {
    console.log('🧪 TEST DE COMMANDE - Début du test');
    
    if (this.categoryPlats.length === 0) {
      console.warn('⚠️ Aucun plat disponible pour tester');
      alert('Aucun plat chargé');
      return;
    }

    const platTest = this.categoryPlats[0];
    console.log('🍽️ Plat de test:', platTest);
    
    // Test de la réservation
    this.reserver(platTest);
  }

  showDetails(plat: any) {
    console.log('🔍 Détails du plat:', plat);
    alert(`Détails de ${plat.nom}:\n\n${plat.description}\n\nPrix: ${plat.prix} DT`);
  }

  // Pipe personnalisé pour afficher "DT"
  formatPrix(prix: number): string {
    return `${prix} DT`;
  }
}