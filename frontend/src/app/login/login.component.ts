import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit  {

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
});

  errorMessage:string="Invalid Credentials";
  isLoginFailed: boolean = false;
  
 


  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}
  ngOnInit(): void {
    
  }

  handleLogin(){
    if(this.loginForm.valid){
      const { username,password } = this.loginForm.value;
      this.authService.login(username,password).subscribe(
        (response: any) => {
          const token = response["JWT Token"];
          console.log(response);
          console.log('Token received:', token);
          if (token) {
            this.authService.saveToken(token); // Save the token to local storage
            alert("Login successful");
            this.router.navigate(['/profile']); // Navigate to the profile or desired route
          }
        },
      (error:any)=>{
        alert("Login failed");
     
        this.isLoginFailed = true;
        this.errorMessage = 'Invalid credentials';

      }
    )

  }

}
}
