import { Component, Input } from '@angular/core';
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

  constructor(private experienciaService: ExperienceService) {}

  ngOnInit(): void {
    this.experienciaService.getExperiencias().subscribe((data) => {
      this.experiencias = data;
      this.filtrarExperiencias();
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
}
