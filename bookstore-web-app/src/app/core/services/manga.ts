import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  private apiUrl = 'https://api.mangadex.org/manga';

  constructor(private http: HttpClient) {}

  getMangas(limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}`);
  }

  searchManga(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?title=${title}`);
  }
}