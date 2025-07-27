import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experiencia: Experiencia | undefined;
  fechaSeleccionada: Date | undefined;
  
  constructor(
    private experienciaService: ExperienceService, 
    private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.experienciaService.getExperienciaPorId(id).subscribe(data => {
        this.experiencia = data;
      });
    });

    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.fechaSeleccionada = new Date(params['date']);
      }
    });
  }  
}
