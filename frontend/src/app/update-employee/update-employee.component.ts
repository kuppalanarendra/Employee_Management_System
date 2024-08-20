import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
  providers:[EmployeeService]
})
export class UpdateEmployeeComponent implements OnInit{
  updateForm!:FormGroup
  
  employeeId:number=0;

 

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      id:[],
      name: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]]
    });
  }
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    this.loadEmployeeData();
  }
  loadEmployeeData(){
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (data:Employee) => {
        this.updateForm.patchValue(data); 
       
        
      },
      (error) => {
        console.error('Error fetching employee data', error);
      }
    );

  }

  updateEmployee(){
    console.log("update")
    if (this.updateForm.valid) {
      console.log("called")
      const updatedEmployee: Employee = this.updateForm.value;
    this.employeeService.updateEmployee(this.employeeId,updatedEmployee).subscribe(
      data=>{
        console.log('Employee updated successfully');
        this.router.navigate(['/employee-list']);
      }
    )

  }
  }}
