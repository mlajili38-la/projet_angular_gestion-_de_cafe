// main.ts
import { AppComponent } from './app/app';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Home } from './app/home/home';
import { Menu } from './app/menu/menu';
import { PlatDetail } from './app/plat-detail/plat-detail';
import { Reservation } from './app/reservation/reservation';
import { Client } from './app/client/client';
import { Contact } from './app/contact/contact';
import { Header } from './app/header/header';
import { ReservTab } from './app/reserv-tab/reserv-tab';
import { Promotion } from './app/promotions/promotions';
import { ReservationSimple } from './app/reservation-simple/reservation-simple'; // ← AJOUTEZ CET IMPORT

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: Home },
      { path: 'menu', component: Menu },
      { path: 'plat/:id', component: PlatDetail },
      { path: 'reservation', component: Reservation },
      { path: 'reservation-simple', component: ReservationSimple }, // ← AJOUTEZ CETTE LIGNE
      { path: 'clients', component: Client },
      { path: 'contact', component: Contact },
      { path: 'reservation1', component: ReservTab },
      { path: 'promotions', component: Promotion },
    ])
  ]
}).catch(err => console.error(err));