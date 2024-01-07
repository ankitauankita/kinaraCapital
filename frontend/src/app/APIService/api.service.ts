import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  async getFilterData(filters: any): Promise<Observable<any[]>> {
    let queryparams = Object.entries(filters)
      .filter(
        ([key, value]) => value !== undefined && value !== null && value !== ''
      )
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    let res = this.http.get<any[]>(
      `${this.baseUrl}getStudentByFilter?${queryparams}`
    );
    console.log(res, typeof res);
    return res;
  }

  async getAllRecords(): Promise<Observable<any[]>> {
    return this.http.get<any[]>(`${this.baseUrl}getStudentByFilter`);
  }
}
