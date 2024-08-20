import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8081/employees'; 
  constructor(private http: HttpClient) { }

  addEmployee(employee: Employee): Observable<Object> {
    console.log(employee.position);
    return this.http.post(`${this.apiUrl}`, employee);
    
  }

  getEmployees(): Observable<any[]> {
   
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
  
  updateEmployee(id: number, employee: Employee): Observable<Object>{
    console.log(employee.department);
    return this.http.put(`${this.apiUrl}/${id}`, employee);
  }
  

  deleteEmployee(id: number): Observable<Object>{
    console.log(id);
    return this.http.delete(`${this.apiUrl}/${id}`);
  } 
}
