import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  showMobileFilters = false;
  price: number = 100000;

  experiencias: Experiencia[] = [];
  experienciasFiltradas: Experiencia[] = [];
  destino: string = '';

  constructor(private experienciaService: ExperienceService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const destinoParam = params['destino'];
      if (destinoParam) {
        this.destino = destinoParam.replace(/-/g, ' ');
      }

      // Cada vez que cambia el destino, se vuelve a cargar
      this.experienciaService.getExperiencias().subscribe((data) => {
        this.experiencias = data;
        this.filtrarExperiencias();
      });
    });
  }

  toggleMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters;
  }

  aplicarFiltros(filtros: { precioMax: number, puntuacionMin: number }) {
    this.experienciasFiltradas = this.experiencias.filter(
      (exp) =>
        exp.precio <= filtros.precioMax &&
        exp.puntuacion >= filtros.puntuacionMin
    );
  }

  filtrarExperiencias() {
    this.experienciasFiltradas = this.experiencias.filter(
      (exp) => exp.precio <= this.price
    );
  }

  onBuscar(destino: string) {
    const destinoParam = destino.trim().replace(/ /g, '-'); 
    this.router.navigate(['/resultados', destinoParam]);  }
}
