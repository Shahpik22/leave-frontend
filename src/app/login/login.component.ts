import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth.login(this.loginData).subscribe({
      next: (res: any) => {

        // 💾 save user for calendar
        this.auth.saveUser(res.user);

        // optional token
        localStorage.setItem('token', res.token);

        alert('Login successful');

        // go to calendar
        this.router.navigate(['/calendar']);
      },
      error: () => {
        alert('Invalid login');
      }
    });
  }
}