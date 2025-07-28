import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-exp-images',
  templateUrl: './exp-images.component.html',
  styleUrls: ['./exp-images.component.css'],
})
export class ExpImagesComponent {
  @Input() experiencia: Experiencia | undefined;
  @Input() ciudad: string = '...';
  defaultImg: string = '/assets/images/default-image.jpg';

  constructor(private http: HttpClient) {}

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = this.defaultImg;
  }
}
