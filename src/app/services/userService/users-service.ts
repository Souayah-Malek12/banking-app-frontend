import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: 'ADMIN' | 'USER'  | string;
  accounts?: any[]; // refine if you know account shape
}

export interface Transaction {
  id: number;
  amount: number;      // use number, not Int16Array
  type: string;
  timestamp: string | Date;  // backend returns ISO string
}

export interface Account {
  id: number;
  accountHolderName : string;
  balance : number;
  rib : string;
  transactions : Transaction[]
  type: string;
}

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: string;
  accounts: Account[];
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(user : CreateUserRequest): Observable<UserResponse> {
    const token = typeof localStorage !== 'undefined'
    ? localStorage.getItem('authToken')
    : null;

  const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.post<UserResponse>(`${this.apiUrl}/users`, user, { headers })
  }

  getAllUsers(): Observable<UserResponse[]>{
    const token = typeof localStorage !== 'undefined'
    ? localStorage.getItem('authToken')
    : null;

  const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.get<UserResponse[]>(`${this.apiUrl}/users`,  { headers });
  }

  getUserById(id : number) : Observable<UserResponse> {
    const token = typeof localStorage !== 'undefined'
    ? localStorage.getItem('authToken')
    : null;

  const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    return this.http.get<UserResponse>(`${this.apiUrl}/users/${id}`,  { headers });
  }

  deleteUserById(id :number) : Observable<String> {
    const token = typeof localStorage !== 'undefined'
            ? localStorage.getItem('authToken')
            : null;
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;

    return this.http.delete(`${this.apiUrl}/users/${id}`,  { headers,responseType: 'text' });
  }
}
