import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedTab: string = 'vuelos';
  personas: number = 1;


  selectTab(tab: string): void {
    this.selectedTab = tab;}
}
