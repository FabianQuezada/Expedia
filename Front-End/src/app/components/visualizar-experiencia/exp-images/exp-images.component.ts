import { Component, Input } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-exp-images',
  templateUrl: './exp-images.component.html',
  styleUrls: ['./exp-images.component.css']
})
export class ExpImagesComponent {
  @Input() experiencia: Experiencia | undefined;

}
