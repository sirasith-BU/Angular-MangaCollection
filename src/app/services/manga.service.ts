import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateMangaDTO,
  GetMangaDTO,
  UpdateMangaDTO,
  GetMangaAsyncDTO,
} from '../interfaces/IManga';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment.prod';

@Injectable({ providedIn: 'root' })
export class MangaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getManga(): Observable<GetMangaDTO[]> {
    return this.http.get<GetMangaDTO[]>(this.apiUrl);
  }

  getMangaAsync(id: number): Observable<GetMangaAsyncDTO> {
    return this.http.get<GetMangaAsyncDTO>(this.apiUrl + `/${id}`);
  }

  createManga(data: CreateMangaDTO) {
    return this.http.post(this.apiUrl, data);
  }

  updateManga(data: UpdateMangaDTO, id: number) {
    return this.http.put(this.apiUrl + `/${id}`, data);
  }

  deleteManga(id: number) {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
