import { Component, OnInit } from '@angular/core';
import { UserResponse, UsersService } from '../../services/userService/users-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-manage',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './user-manage.html',
  styleUrl: './user-manage.scss'
})
export class UserManage implements OnInit {



  constructor (private usersService: UsersService,
       private route:ActivatedRoute,
        private router : Router
      ){}

  loading = false;
  error: string | null = null;
  user: UserResponse | null = null;


  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
    if (id !== null) {
      this.fetchUserById(id);
    } else {
      this.error = 'No user ID provided';
    }
  }

  fetchUserById(id: number): void {
    this.loading = true;
    this.usersService.getUserById(id).subscribe({
      next: (res) => {
        this.loading = false;
        this.user = res;
        console.log(this.user);


      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to load the account';
      }
    });
  }

  deleteAccount(id: number) : void{
      this.usersService.deleteUserById(id).subscribe({
        next : (res : String)=>{
          this.loading = false;
          console.log('Account deleted successfully');
          alert(res)
          this.router.navigate(['/get-all-u']); // happens immediately

        },
        error :(err)=>{
          this.loading = false;
          this.error = err?.error?.message || 'Failed to delete the account';
        }
      })
  }
}
