import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedTab: string = 'vuelos';
  
  constructor(private router: Router) {}

  selectTab(tab: string): void {
    this.selectedTab = tab;}

  buscarDestino(data: { destino: string, fecha: Date }) {
    const destinoParam = data.destino.trim().replace(/ /g, '-');

    const fechaParam = data.fecha.toISOString().split('T')[0];

    this.router.navigate(['/resultados', destinoParam], {
      queryParams: {
        fecha: fechaParam
      }
    });
  }
}
