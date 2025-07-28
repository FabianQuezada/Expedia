import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements AfterViewInit {
  @Input() servicio!: Experiencia;
  @ViewChild('scrollBox') scrollBox!: ElementRef<HTMLDivElement>;

  iconosCaracteristicas: { [clave: string]: string } = {
    'Cancelacion gratuita disponible': 'bi-check-lg',
    'Voucher móvil': 'bi-phone-fill',
    'Traslado de hoteles seleccionados': 'bi-truck',
    'Confirmación instantánea': 'bi-lightning',
    'Varios idiomas': 'bi-chat-square-dots'
  };

  constructor(private sanitizer: DomSanitizer) {}

  sanitizarMapa(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  isTopVisible = false;
  isBottomVisible = true;

  ngAfterViewInit() {
    this.onScroll(); // inicializa sombras
  }

  onScroll() {
    const scrollEl = this.scrollBox.nativeElement;
    const scrollTop = scrollEl.scrollTop;
    const scrollHeight = scrollEl.scrollHeight;
    const clientHeight = scrollEl.clientHeight;

    this.isTopVisible = scrollTop > 0;
    this.isBottomVisible = scrollTop + clientHeight < scrollHeight;
  }
}
