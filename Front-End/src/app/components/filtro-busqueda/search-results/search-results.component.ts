import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { DateUtilsService } from 'src/app/services/date-utils.service';
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

  constructor(private experienciaService: ExperienceService, private route: ActivatedRoute, private router: Router, protected dateUtils: DateUtilsService) {}
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      const destinoParam = query['location'];
      const fechaParam = query['date'];

      if (destinoParam) {
        this.destino = destinoParam.replace(/-/g, ' ').trim().toLowerCase();
      }

      if (fechaParam) {
        this.fecha = new Date(fechaParam);
        console.log('[DEBUG] Fecha desde queryParams:', this.fecha);
      }

      this.experienciaService.getExperiencias().subscribe(data => {
        console.log('[DEBUG] Experiencias obtenidas:', data);
        this.experiencias = data;
        this.filtrarExperiencias();
      });
    });
  }

  toggleMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters;
  }

  aplicarFiltros(filtros: { precioMax: number, puntuacionMin: number, categorias: string[] }) {
    console.log('[DEBUG] Filtros aplicados:', filtros);
    this.experienciasFiltradas = this.experiencias.filter((exp) => {
      const coincideUbicacion = exp.ubicacion.toLowerCase() === this.destino.toLowerCase();
      const coincideFecha = this.fecha
        ? exp.fechasExperiencias.some((f) =>
            this.dateUtils.esMismaFecha(new Date(f.fecha), this.fecha!)
          )
        : true;

      const cumplePrecio = exp.precio <= filtros.precioMax;
      const cumplePuntuacion = exp.puntuacion >= filtros.puntuacionMin;
      const cumpleCategoria =
        filtros.categorias.length === 0 || filtros.categorias.includes(exp.categoria.toLowerCase());

      const resultado = coincideUbicacion && coincideFecha && cumplePrecio && cumplePuntuacion && cumpleCategoria;

      console.log(`[DEBUG] Experiencia: ${exp.titulo}`);
      console.log(`  → Ubicación: ${coincideUbicacion}`);
      console.log(`  → Fecha: ${coincideFecha}`);
      console.log(`  → Precio: ${cumplePrecio}`);
      console.log(`  → Puntuación: ${cumplePuntuacion}`);
      console.log(`  → Categoría: ${cumpleCategoria}`);
      console.log(`  → Resultado: ${resultado}`);

      return resultado;
    });

    console.log('[DEBUG] Experiencias filtradas por filtros:', this.experienciasFiltradas);
  }

  filtrarPrecio() {
    this.experienciasFiltradas = this.experiencias.filter(
      (exp) => exp.precio <= this.price
    );
  }

filtrarExperiencias() {
  console.log('[DEBUG] Ejecutando filtrarExperiencias()');

  this.experienciasFiltradas = this.experiencias.filter((exp) => {
    const ubicacionExp = exp.ubicacion.trim().toLowerCase();
    const destinoBuscado = this.destino.trim().toLowerCase();

    const coincideUbicacion = ubicacionExp === destinoBuscado;

    if (!coincideUbicacion) {
      console.warn(`[UBICACION NO COINCIDE]`);
      console.warn(`  → Ubicación de la experiencia: "${exp.ubicacion}" → "${ubicacionExp}"`);
      console.warn(`  → Destino buscado: "${this.destino}" → "${destinoBuscado}"`);
    }

    const coincideFecha = exp.fechasExperiencias.some((f) => {
      const mismaFecha = this.fecha ? this.dateUtils.esMismaFecha(new Date(f.fecha), this.fecha) : true;

      if (this.fecha && mismaFecha) {
        console.log(`[MATCH] Fecha válida para "${exp.titulo}" → ${f.fecha}`);
      }

      return mismaFecha;
    });

    const resultado = coincideUbicacion && coincideFecha;

    console.log(`[DEBUG] Evaluando "${exp.titulo}"`);
    console.log(`  → Ubicación válida: ${coincideUbicacion}`);
    console.log(`  → Fecha válida: ${coincideFecha}`);
    console.log(`  → Resultado final: ${resultado}`);

    return resultado;
  });

  console.log('[DEBUG] Experiencias finales filtradas:', this.experienciasFiltradas);
}

  onBuscar(data: { destino: string, fecha: Date }) {
    console.log('[DEBUG] onBuscar() →', data);
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
