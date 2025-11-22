import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Promotion } from './promotions/promotions';
import { ChefComponent } from './chef/chef';
import { Commentaire } from './commentaire/commentaire';
import { Contact } from './contact/contact';
import { Menu } from './menu/menu';
import { ReservTab } from './reserv-tab/reserv-tab';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Header,Footer,Promotion,ChefComponent,Commentaire,Contact,Menu,ReservTab],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  clients: any[] = []; // tableau global
  constructor(private router: Router) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'  
        });
      }
    });
  }

}
