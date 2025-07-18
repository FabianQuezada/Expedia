import { Component, Input } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-exp-desc',
  templateUrl: './exp-desc.component.html',
  styleUrls: ['./exp-desc.component.css']
})
export class ExpDescComponent {
  @Input() experiencia: Experiencia | undefined;
}
