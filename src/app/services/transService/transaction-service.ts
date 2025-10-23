import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';






export interface TransactionResponse {
  id : number;
  accountId: number;
  amount : number;
  type: string;
  timestamp : Date;
}


@Injectable({
  providedIn: 'root'
})


export class TransactionService {
  private apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) {}

  getAllTransaction(): Observable<TransactionResponse[]>{
    const token = typeof localStorage !== 'undefined'
    ? localStorage.getItem('authToken')
    : null;

  const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

  return this.http.get<TransactionResponse[]>(`${this.apiUrl}/transaction`,  { headers })
  }
}
