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
      }

      this.experienciaService.getExperiencias().subscribe(data => {
        this.experiencias = data;
        this.filtrarExperiencias();
      });
    });
  }
  calcularPrecioPromedio(exp: Experiencia): number {
  const precios = exp.fechasExperiencias?.map(f => f.precio) || [];

  if (precios.length === 0) return 0;

  const suma = precios.reduce((acc, curr) => acc + curr, 0);
  return Math.round(suma / precios.length);
}
  toggleMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters;
  }

  aplicarFiltros(filtros: { precioMax: number, puntuacionMin: number, categorias: string[] }) {
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

      return resultado;
    });

  }

  filtrarPrecio() {
    this.experienciasFiltradas = this.experiencias.filter(
      (exp) => exp.precio <= this.price
    );
  }

filtrarExperiencias() {

  const normalizar = (str: string) =>
    str.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  this.experienciasFiltradas = this.experiencias.filter((exp) => {
    const ubicacionExp = normalizar(exp.ubicacion);
    const destinoBuscado = normalizar(this.destino);

    const coincideUbicacion = ubicacionExp === destinoBuscado;

    if (!coincideUbicacion) {
      console.warn(`[UBICACION NO COINCIDE]`);
      console.warn(`  → Ubicación de la experiencia: "${exp.ubicacion}" → "${ubicacionExp}"`);
      console.warn(`  → Destino buscado: "${this.destino}" → "${destinoBuscado}"`);
    }

    const coincideFecha = exp.fechasExperiencias.some((f) => {
      const mismaFecha = this.fecha ? this.dateUtils.esMismaFecha(new Date(f.fecha), this.fecha) : true;

      if (this.fecha && mismaFecha) {
        console.log(`[MATCH] Fecha válida para "${this.fecha}" → ${f.fecha}`);
      } else {
        console.log(`[No MATCH] Fecha válida para "${this.fecha}" != ${f.fecha}`);
      }

      return mismaFecha;
    });

    const resultado = coincideUbicacion && coincideFecha;


    return resultado;
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
