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
    this.route.queryParams.subscribe(query => {
      const destinoParam = query['location'];
      const fechaParam = query['date'];

      if (destinoParam) {
        this.destino = destinoParam;
      }

      if (fechaParam) {
        this.fecha = new Date(fechaParam);
      }

      this.experienciaService.getExperiencias().subscribe(data => {
        this.experiencias = data;
        this.filtrarExperiencias();
      });
    });
  }

  toggleMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters;
  }

  aplicarFiltros(filtros: { precioMax: number, puntuacionMin: number, categorias: string[] }) {
    this.experienciasFiltradas = this.experiencias.filter((exp) => {
      const coincideUbicacion = exp.ubicacion.toLowerCase() === this.destino.toLowerCase();
      const coincideFecha = this.fecha
        ? exp.fechasExperiencia.some((f) =>
            new Date(f.fecha).toISOString().split('T')[0] === this.fecha!.toISOString().split('T')[0])
        : true;

      const cumplePrecio = exp.precio <= filtros.precioMax;
      const cumplePuntuacion = exp.puntuacion >= filtros.puntuacionMin;
      const cumpleCategoria =
        filtros.categorias.length === 0 || filtros.categorias.includes(exp.categoria.toLowerCase());

      return coincideUbicacion && coincideFecha && cumplePrecio && cumplePuntuacion && cumpleCategoria;
    });
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
    const coincideFecha = exp.fechasExperiencia.some((f) => {
      const fechaExp = new Date(f.fecha).toISOString().split('T')[0];
      const fechaSeleccionadaStr = this.fecha!.toISOString().split('T')[0];
      return fechaExp === fechaSeleccionadaStr;
    });

    return coincideUbicacion && coincideFecha;
  });
  }

  onBuscar(data: { destino: string, fecha: Date }) {
    this.destino = data.destino;
    this.fecha = data.fecha;

    this.filtrarExperiencias();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        location: this.destino,
        date: this.fecha.toISOString().split('T')[0]
      },
      queryParamsHandling: 'merge'
    });
  }
}
