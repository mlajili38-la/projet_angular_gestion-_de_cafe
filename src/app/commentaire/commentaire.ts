import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commentaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commentaire.html',
  styleUrls: ['./commentaire.css']
})
export class Commentaire {
  currentTestimonial = 0;
  
  testimonials = [
    {
      text: 'Un café exceptionnel ! ☕✨ Le goût est riche, l\'arôme incroyable et le service impeccable. Merci pour cette belle expérience !',
      clientName: 'Rym Marzouk',
      profession: 'Client',
      avatar: '/assets/a2.jpg'
    },
    {
      text: 'Vraiment l\'un des meilleurs cafés que j\'ai goûtés ! 😍 Merci pour la qualité, l\'accueil chaleureux et le professionnalisme. Je recommande à 100 % !',
      clientName: 'Mohamed Ali Khlifi',
      profession: 'Client',
      avatar: '/assets/a2.jpg'
    },
    {
      text: 'Super café, ambiance top et saveur parfaite ! ☕❤️ Merci pour ce moment délicieux, je reviendrai sans hésiter.',
      clientName: 'Amir Menzli',
      profession: 'Client',
      avatar: '/assets/a2.jpg'
    }
  ];
}