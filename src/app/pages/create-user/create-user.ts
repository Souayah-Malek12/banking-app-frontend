import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserResponse, UsersService } from '../../services/userService/users-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss'
})
export class CreateUser {

  form : FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private userService : UsersService){
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required],
      accounts: [[]] // optional empty array
    });
  }

  submit() {
    if (this.form.invalid) return ;

    this.userService.createUser(this.form.value).subscribe({

      next : (res: UserResponse)=>{
        if(res){
          alert(`user created succsfully ${res.fullName}` );
        }
      },

      error: (err)=>{
        this.error = err.error.message
        console.error('Error creating category:', err);

      }
    })
  }

}
