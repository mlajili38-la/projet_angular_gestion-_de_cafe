import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Menu } from './menu/menu';
import { PlatDetail } from './plat-detail/plat-detail';
import { ReservTab } from './reserv-tab/reserv-tab';
import { Reservation } from './reservation/reservation';
import { Client } from './client/client';
import { Contact } from './contact/contact';
import { Promotion } from './promotions/promotions';
import { ReservationSimple } from './reservation-simple/reservation-simple';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'menu', component: Menu },
    { path: 'plat/:id', component: PlatDetail },
    { path: 'reservation', component: Reservation },
    { path: 'reservation-simple', component: ReservationSimple }, // ← Ajoutez cette ligne
    { path: 'clients', component: Client },
    { path: 'contact', component: Contact },
    { path: 'reserv-tab', component: ReservTab },
    { path: 'promotions', component: Promotion },
];