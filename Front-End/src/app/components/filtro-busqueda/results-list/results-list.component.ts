import { Component, Input } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent {
onExperienceClick(arg0: any) {
throw new Error('Method not implemented.');
}
  @Input() experiencias: Experiencia[] = [];

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/noimage.jpg';
  }  
}
