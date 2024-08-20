import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.module';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers:[UserService,AuthService]
})
export class ProfileComponent {
  user: User | null = null;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const token = this.authService.getToken();
    if (token) {
      this.userService.getProfile(token).subscribe(
        (data: User) => {
          this.user = data;
        },
        (error:any) => {
          this.errorMessage = 'Failed to load user profile.';
          console.error('Error fetching profile:', error);
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
}
