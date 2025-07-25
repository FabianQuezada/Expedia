import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceService} from 'src/app/services/experience.service';
import { Experiencia } from '../../models/experiencia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedTab: string = 'vuelos';
  experiencias: Experiencia[] = [];
  chunkedExperiencias: Experiencia[][] = [];
  mostrarTodas: boolean = false;

  constructor(
    private router: Router,
    private experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    this.experienceService.getExperiencias().subscribe((data) => {
      this.experiencias = data;
      this.dividirEnGruposDeCuatro(data);
    });
  }

  private dividirEnGruposDeCuatro(lista: Experiencia[]) {
    const chunks: Experiencia[][] = [];
    for (let i = 0; i < lista.length; i += 4) {
      chunks.push(lista.slice(i, i + 4));
    }
    this.chunkedExperiencias = chunks;
  }
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  buscarDestino(data: { destino: string; fecha: Date }) {
    const destinoParam = data.destino.trim().replace(/ /g, '-');
    const fechaParam = data.fecha.toISOString().split('T')[0];

    this.router.navigate(['/resultados', destinoParam], {
      queryParams: {
        fecha: fechaParam
      }
    });
  }



}
