import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateMangaDTO,
  GetMangaDTO,
  UpdateMangaDTO,
  GetMangaAsyncDTO,
} from '../interfaces/IManga';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MangaService {
  private mangaApiUrl = environment.apiUrl + '/api/manga';

  constructor(private http: HttpClient) {}

  getManga(): Observable<any> {
    return this.http.get<GetMangaDTO[]>(this.mangaApiUrl);
  }

  getMangaAsync(id: number): Observable<any> {
    return this.http.get<GetMangaAsyncDTO>(this.mangaApiUrl + `/${id}`);
  }

  createManga(data: CreateMangaDTO): Observable<any> {
    return this.http.post(this.mangaApiUrl, data);
  }

  updateManga(data: UpdateMangaDTO, id: number): Observable<any> {
    return this.http.put(this.mangaApiUrl + `/${id}`, data);
  }

  deleteManga(id: number): Observable<any> {
    return this.http.delete(this.mangaApiUrl + `/${id}`);
  }

  searchMangas(
    keyword: string,
    type: string,
    publisher: string
  ): Observable<any> {
    return this.http.get(
      this.mangaApiUrl +
        `/search?keyword=${keyword}&type=${type}&publisher=${publisher}`
    );
  }

  getPublishers(): Observable<any> {
    return this.http.get(this.mangaApiUrl + '/publishers');
  }

  getTypes(): Observable<any> {
    return this.http.get(this.mangaApiUrl + '/types');
  }
}
