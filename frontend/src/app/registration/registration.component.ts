import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';




@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers:[AuthService]
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;
 


  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

    ngOnInit(): void {
      this.registerForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
      
    }

  register(){
    if(this.registerForm.valid){
      const { username, email, password } = this.registerForm.value;
      console.log(email);
      this.authService.register(username,email,password).subscribe(response=>{
        alert('User registered successfully');
        this.router.navigate(['/login']);
  
      }, error =>{
        alert('Registration failed');
      });
      

    }
    

    


  }

}
