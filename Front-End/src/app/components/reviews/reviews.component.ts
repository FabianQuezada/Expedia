import { Component, ElementRef, AfterViewInit, ViewChild, ViewChildren, QueryList, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from 'src/app/models/review';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit, AfterViewInit {
  selectedOrder: 'recientes' | 'positivas' | 'negativas' = 'recientes';
  reviews: Review[] = [];

  @ViewChild('orderOptionsContainer') orderOptionsContainer!: ElementRef<HTMLDivElement>;
  @ViewChildren('orderOptionRecientes, orderOptionPositivas, orderOptionNegativas', { read: ElementRef })
  orderOptions!: QueryList<ElementRef<HTMLSpanElement>>;

  lineStyle = {
    width: '0px',
    transform: 'translateX(0px)'
  };

  @Input() idExperiencia: number = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idExperiencia = Number(this.route.snapshot.queryParamMap.get('idExperiencia') ?? 1); // fallback id 1
    this.cargarResenas();
  }

  cargarResenas(): void {
    this.http.get<Review[]>(`http://localhost:3000/resena/experiencia/${this.idExperiencia}`)
      .subscribe({
        next: (data) => {
          this.reviews = data.map(r => ({
            ...r,
            date: new Date(r.date)
          }));
          this.ordenar(this.selectedOrder);
        },
        error: (err) => {
          console.error('Error al cargar reseñas:', err);
        }
      });
  }

  selectOrder(order: 'recientes' | 'positivas' | 'negativas') {
    this.selectedOrder = order;
    this.ordenar(order);
    this.updateLine();
  }

  ordenar(criterio: string) {
    if (criterio === 'recientes') {
      this.reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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

  ngAfterViewInit() {
    this.updateLine();
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
