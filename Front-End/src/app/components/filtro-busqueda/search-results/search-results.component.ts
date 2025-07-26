import { Component } from '@angular/core';
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
  fecha: Date | undefined;
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

      this.route.queryParams.subscribe((queryParams: Params) => {
        const fechaQuery = queryParams['fecha'];
        if (fechaQuery) {
          this.fecha = new Date(fechaQuery);
        }

        this.experienciaService.getExperiencias().subscribe((data) => {
          this.experiencias = data;
          this.filtrarExperiencias();
        });
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

  filtrarPrecio() {
    this.experienciasFiltradas = this.experiencias.filter(
      (exp) => exp.precio <= this.price
    );
  }
  
  filtrarExperiencias() {
  this.experienciasFiltradas = this.experiencias.filter((exp) => {
    const coincideUbicacion = exp.ubicacion.toLowerCase() === this.destino.toLowerCase();

    // Buscar coincidencia exacta de fecha en el array de fechas
    const coincideFecha = exp.fechasExperiencias.some((f) => {
      const fechaExp = new Date(f.fecha).toISOString().split('T')[0];
      const fechaSeleccionadaStr = this.fecha!.toISOString().split('T')[0];
      return fechaExp === fechaSeleccionadaStr;
    });

    return coincideUbicacion && coincideFecha;
  });
  }

  onBuscar(data: { destino: string, fecha: Date }) {
    const destinoParam = data.destino.trim().replace(/ /g, '-'); 
    const fechaParam = data.fecha.toISOString().split('T')[0];

    this.router.navigate(['/resultados', destinoParam],
      {queryParams: { fecha: fechaParam } }
    );  }
}
