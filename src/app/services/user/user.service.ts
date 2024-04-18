import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../../interfaces/register';
import { Login } from '../../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private baseUrl = 'https://localhost:5000/api/user';
  private baseUrl = 'http://localhost:5000/api/user';
  // private baseUrl = 'https://sore-erin-barracuda-yoke.cyclic.app/api/user';
  userId = '';
  constructor(private http: HttpClient) {}
  register(body: Register): Observable<Register> {
    return this.http.post<Register>(`${this.baseUrl}/register`, body);
  }
  login(body: Login): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/login`, body);
  }
  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/logout`);
  }
  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/userData`);
  }
}
