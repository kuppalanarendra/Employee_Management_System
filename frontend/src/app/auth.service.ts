import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';4

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username:string="";
  public password:string="";
  public email:string="";
  private baseUrl = 'http://localhost:8080/users';

  constructor(private http:HttpClient) { }

  register(username: string,email:string, password: string): Observable<any> {
    console.log(email);
    return this.http.post(`${this.baseUrl}/register`, { username, password,email });
  }

  login(username:string,password:string){
    console.log(password);
    return this.http.post<any>(`${this.baseUrl}/login`,{username,password});
   
  }
  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
} 
