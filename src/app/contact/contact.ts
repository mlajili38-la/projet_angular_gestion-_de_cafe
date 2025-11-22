import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  nom: string = '';
  email: string = '';
  message: string = '';

  envoyer() {
    if (this.nom && this.email && this.message) {
      // Simulation d'envoi
      console.log('Message envoyé:', { nom: this.nom, email: this.email, message: this.message });
      alert('Message envoyé avec succès !');
      
      // Réinitialisation du formulaire
      this.nom = '';
      this.email = '';
      this.message = '';
    } else {
      alert('Veuillez remplir tous les champs.');
    }
}
}