import { Auth, LoginResponse } from '../../services/authService/auth';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

registerForm : FormGroup;
loading =  false;
error: string | null = null;

constructor(private fb :FormBuilder, private auth : Auth, private router:Router){

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]

    })
}


onSubmit() {
  if (this.registerForm.invalid) return ;

  this.loading = true;
  this.error = null;

  this.auth.register(this.registerForm.value).subscribe({
    next : (res: LoginResponse)=> {
      this.loading = false;
      console.log('Registration successful', res);
      this.router.navigate(['/login']);
    },

    error : (err)=> {
      this.loading = false;
      this.error = err.error?.message || 'Registration failed';
    }

  })

}

}
