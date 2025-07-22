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
  
  constructor(
    private experienciaService: ExperienceService, 
    private route: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.experienciaService.getExperienciaPorId(id).subscribe(
      (experiencia) => {
        this.experiencia = experiencia;
      },
      (error) => {
        console.error('Error al cargar la experiencia', error);
      }
    );
  }  
}
