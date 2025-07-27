import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Review {
  score: number;
  author: string;
  text: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class ResenaService {
  private apiUrl = 'http://localhost:3000/resena';

  constructor(private http: HttpClient) {}

  getResenasPorExperiencia(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/resena/experiencia/${id}`);
  }
}
