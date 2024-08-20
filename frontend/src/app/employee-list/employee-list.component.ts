import { Component,OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router, RouterModule } from '@angular/router';
import { subscribe } from 'diagnostics_channel';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  providers:[EmployeeService]
})
export class EmployeeListComponent  implements OnInit {
  employees:Employee[]=[];

  constructor(private employeeService: EmployeeService,private router:Router){
     
  } 
  ngOnInit():void{
    this.getEmployees();

  }

  private getEmployees(){
    this.employeeService.getEmployees().subscribe(data =>{
      this.employees=data;

    });


  }
  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }
  updateEmployee(id: number){
    console.log(id);
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          alert('Employee Data Deleted Successfully');
          this.router.navigate(['/employee-list']);
        },
        error => {
          // Log the error and show a user-friendly message
          console.error('Error deleting employee', error);
          alert('Error deleting employee. Please try again.');
        }
      );
    }
  }}
