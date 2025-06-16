import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedTab: string = 'vuelos';
  personas: number = 1;

  constructor(private router: Router) {}

  selectTab(tab: string): void {
    this.selectedTab = tab;}

  buscarDestino(destino: string) {
    const destinoParam = destino.trim().replace(/ /g, '-'); // ejemplo: Viña del Mar → Viña-del-Mar
    this.router.navigate(['/resultados', destinoParam]);
  }
}
