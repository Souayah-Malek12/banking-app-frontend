import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


export interface LoginRequest {
  email :string;
  password : string;
}

export interface LoginResponse {
  token : string;
  email: string ;
  fullName: string;
  role: string;
}

export interface RegisterRequest {
  fullName : string;
  email : string;
  password : string;
  phoneNumber: string;
  address: string;

}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = environment.apiUrl;

  constructor(private http:HttpClient, private router : Router){}

  login(credentails: LoginRequest): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentails)
            .pipe(
              tap(response => {
                if (response.token) {
                  localStorage.setItem('authToken', response.token);
                  localStorage.setItem('user', JSON.stringify({
                    email: response.email,
                    fullName: response.fullName,
                    role: response.role
                  }));
                }
              })
            )
  }

  register(credentails : RegisterRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/register`, credentails)
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getRole(): any {
    const role = localStorage.getItem('role');
    return role ? JSON.parse(role) : null;
  }


}
