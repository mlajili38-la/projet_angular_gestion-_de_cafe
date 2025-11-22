import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-promotion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './promotions.html',
  styleUrls: ['./promotions.css']
})
export class Promotion {
  promotions = [
    {
      id: 1,
      titre: "Saint Valentin ❤️",
      description: "Offre spéciale -20% sur tous les cafés gourmands pour les couples",
      image: "/assets/valentin.jpg",
      dateDebut: "2025-02-10",
      dateFin: "2025-02-14",
      codePromo: "LOVE2025",
      couleur: "#e91e63"
    },
    {
      id: 2,
      titre: "Baccalauréat 🎓",
      description: "Étudiants : -15% sur toute la carte avec présentation de la carte étudiante",
      image: "/assets/bac.jpg",
      dateDebut: "2025-05-15",
      dateFin: "2025-07-31",
      codePromo: "BAC2025",
      couleur: "#2196f3"
    },
    {
      id: 3,
      titre: "Happy Hour ☕",
      description: "Tous les jours de 15h à 17h : -30% sur les pâtisseries maison",
      image: "/assets/happy-hour.jpg",
      dateDebut: "2025-01-01",
      dateFin: "2025-12-31",
      codePromo: "HAPPY30",
      couleur: "#ff9800"
    },
    {
      id: 4,
      titre: "Week-end Gourmand 🍰",
      description: "Le samedi et dimanche : Menu brunch à prix spécial -25%",
      image: "/assets/weekend.jpg",
      dateDebut: "2025-01-04",
      dateFin: "2025-12-28",
      codePromo: "WEEKEND25",
      couleur: "#4caf50"
    },
    {
      id: 5,
      titre: "Fidélité Café ☕",
      description: "10ème café offert avec notre carte de fidélité",
      image: "/assets/fidelite.jpg",
      dateDebut: "2025-01-01",
      dateFin: "2025-12-31",
      codePromo: "FIDELE10",
      couleur: "#795548"
    },
    {
      id: 6,
      titre: "Anniversaire 🎂",
      description: "Offert : Une part de gâteau pour votre anniversaire !",
      image: "/assets/anniversaire.jpg",
      dateDebut: "2025-01-01",
      dateFin: "2025-12-31",
      codePromo: "HAPPYBIRTHDAY",
      couleur: "#9c27b0"
    }
  ];

  // Vérifier si une promotion est active
  estActive(promotion: any): boolean {
    const aujourdhui = new Date();
    const debut = new Date(promotion.dateDebut);
    const fin = new Date(promotion.dateFin);
    return aujourdhui >= debut && aujourdhui <= fin;
  }

  // Obtenir le nombre de jours restants
  joursRestants(promotion: any): number {
    const aujourdhui = new Date();
    const fin = new Date(promotion.dateFin);
    const diffTime = fin.getTime() - aujourdhui.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Méthode pour copier le code promo
  copierCode(code: string): void {
    // Utiliser l'API Clipboard pour copier le texte
    navigator.clipboard.writeText(code).then(() => {
      // Afficher une notification de succès
      this.afficherNotification(`Code "${code}" copié ! 📋`);
    }).catch(err => {
      // Fallback pour les navigateurs qui ne supportent pas l'API Clipboard
      console.error('Erreur lors de la copie:', err);
      this.copierAvecFallback(code);
    });
  }

  // Méthode de fallback pour copier le code
  private copierAvecFallback(code: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = code;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.afficherNotification(`Code "${code}" copié ! 📋`);
      } else {
        this.afficherNotification('Erreur lors de la copie ❌');
      }
    } catch (err) {
      this.afficherNotification('Erreur lors de la copie ❌');
    }
    
    document.body.removeChild(textArea);
  }

  // Méthode pour afficher une notification
  private afficherNotification(message: string): void {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #4caf50, #45a049);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      z-index: 10000;
      font-weight: 600;
      animation: notificationSlideIn 0.3s ease-out;
    `;

    // Ajouter l'animation CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes notificationSlideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes notificationSlideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Ajouter la notification au document
    document.body.appendChild(notification);

    // Supprimer la notification après 3 secondes
    setTimeout(() => {
      notification.style.animation = 'notificationSlideOut 0.3s ease-in forwards';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      }, 300);
    }, 3000);
  }

  // Méthode pour profiter d'une promotion active
  profiterPromotion(promotion: any): void {
    if (this.estActive(promotion)) {
      this.afficherNotification(`Redirection vers la réservation avec le code ${promotion.codePromo}...`);
      // Ici vous pouvez ajouter la logique de redirection ou d'application du code promo
      setTimeout(() => {
        // Exemple de redirection vers la réservation avec le code promo
        console.log(`Application du code promo: ${promotion.codePromo}`);
      }, 1000);
    } else {
      this.afficherNotification(`Promotion "${promotion.titre}" débutera bientôt ! 📅`);
    }
  }

  // Méthode pour programmer un rappel
  programmerRappel(promotion: any): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      // Demander la permission si pas encore accordée
      this.demanderPermissionNotifications().then(permission => {
        if (permission === 'granted') {
          this.creerRappel(promotion);
        }
      });
    } else {
      this.demanderPermissionNotifications().then(permission => {
        if (permission === 'granted') {
          this.creerRappel(promotion);
        } else {
          this.afficherNotification('Rappel programmé dans notre système ! 🔔');
        }
      });
    }
  }

  // Demander la permission pour les notifications
  private async demanderPermissionNotifications(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }

    if (Notification.permission === 'default') {
      return await Notification.requestPermission();
    }

    return Notification.permission;
  }

  // Créer un rappel de promotion
  private creerRappel(promotion: any): void {
    const debut = new Date(promotion.dateDebut);
    const maintenant = new Date();
    const delai = debut.getTime() - maintenant.getTime();

    if (delai > 0) {
      setTimeout(() => {
        new Notification('Promotion Disponible ! 🎉', {
          body: `La promotion "${promotion.titre}" est maintenant active ! Utilisez le code: ${promotion.codePromo}`,
          icon: '/assets/logo.jpg'
        });
      }, delai);

      this.afficherNotification(`Rappel programmé pour le ${debut.toLocaleDateString()} ! 📅`);
    }
  }
}