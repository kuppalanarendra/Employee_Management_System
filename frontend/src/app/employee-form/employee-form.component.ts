import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'console';
import { response } from 'express';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  providers:[EmployeeService]
})
export class EmployeeFormComponent {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService,private router:Router) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]]
    });
    
  }


  onSubmit() {
    console.log("On Submit")
    if (this.employeeForm.valid) {  
      console.log(this.employeeForm.value);
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        response => {
          console.log('Employee added successfully', response);
          this.router.navigate(['/employee-list']);
        },
        error => {
          console.error('Error adding employee', error);
        }
      );
    }
  }

  get name() { return this.employeeForm.get('name'); }
  get department() { return this.employeeForm.get('department'); }
  get position() { return this.employeeForm.get('position'); }
  get salary() { return this.employeeForm.get('salary'); }
}




