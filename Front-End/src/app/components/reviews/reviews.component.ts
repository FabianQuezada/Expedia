import { Component, ElementRef, AfterViewInit, ViewChild, QueryList, ViewChildren } from '@angular/core';

interface Review {
  score: number;
  author: string;
  text: string;
  date: Date; 
  // podrías agregar date?: Date para ordenar por fecha si quieres
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements AfterViewInit {
  selectedOrder: 'recientes' | 'positivas' | 'negativas' = 'recientes'; // valor por defecto
  reviews: Review[] = [
    {
      score: 7,
      author: 'Don Francisco',
      text: 'muy lindo besos',
      date: new Date(2025, 5, 1)
    },
    {
      score: 2,
      author: 'Ricardo Valdivia',
      text: 'muy feo',
      date: new Date(2025, 4, 31)
    },
    {
      score: 10,
      author: 'Héctor Ossandón',
      text: 'perfecto',
      date: new Date(2024, 3, 11)
    },
  ];

  // Referencia al contenedor de las opciones
  @ViewChild('orderOptionsContainer') orderOptionsContainer!: ElementRef<HTMLDivElement>;

  // Referencias a cada opción para medir ancho y posición
  @ViewChildren('orderOptionRecientes, orderOptionPositivas, orderOptionNegativas', { read: ElementRef })
  orderOptions!: QueryList<ElementRef<HTMLSpanElement>>;

  // Estilos para la línea azul activa
  lineStyle = {
    width: '0px',
    transform: 'translateX(0px)'
  };

  ngAfterViewInit() {
    // Inicializa la posición de la línea después de que la vista esté lista
    this.updateLine();
  }

  selectOrder(order: 'recientes' | 'positivas' | 'negativas') {
    this.selectedOrder = order;
    this.ordenar(order);
    this.updateLine();
  }

  ordenar(criterio: string) {
  if (criterio === 'recientes') {
    this.reviews.sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));
  } else if (criterio === 'positivas') {
    this.reviews.sort((a, b) => b.score - a.score);
  } else if (criterio === 'negativas') {
    this.reviews.sort((a, b) => a.score - b.score);
  }
}

  get ratingScore(): number {
    if (this.reviews.length === 0) return 0;
    const total = this.reviews.reduce((sum, r) => sum + r.score, 0);
    return +(total / this.reviews.length).toFixed(1);
  }

  get reviewsCount(): number {
    return this.reviews.length;
  }

  updateLine() {
    const containerEl = this.orderOptionsContainer.nativeElement;
    let activeEl: HTMLElement | undefined;

    this.orderOptions.forEach(el => {
      const text = el.nativeElement.textContent?.toLowerCase() || '';
      if (text.includes(this.selectedOrder)) {
        activeEl = el.nativeElement;
      }
    });

    if (!activeEl) return;

    const containerRect = containerEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    const offsetLeft = activeRect.left - containerRect.left;
    const width = activeRect.width;

    this.lineStyle = {
      width: width + 'px',
      transform: `translateX(${offsetLeft}px)`
    };
  }
}
