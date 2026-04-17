import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  private apiUrl = 'https://backend-bookstore-yzkx.onrender.com/api/manga';

  constructor(private http: HttpClient) {}

  getMangas(limit: number = 10): Observable<any> {
    return this.http.get(
      `${this.apiUrl}?limit=${limit}&includes[]=cover_art&order[followedCount]=desc`
    );
  }

  searchManga(title: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}?title=${title}&includes[]=cover_art&order[followedCount]=desc`
    );
  }
}