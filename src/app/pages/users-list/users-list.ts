import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserResponse, UsersService } from '../../services/userService/users-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone : true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss'
})
export class UsersList implements OnInit{

  loading = false;
  error: string | null = null;
  usersList: UserResponse[] = []
  selectedId : number | null = null;
  selectedUser : UserResponse | null = null ;

   constructor( private userService: UsersService, private router :Router){}



  ngOnInit(): void {
    this.loading = true;
    this.error = null;
      this.userService.getAllUsers().subscribe({

        next : (res )=> {
          this.loading  = false;
            if(res.length != 0){
              this.usersList = res;
              console.log(res)
            }
        },

        error : (err)=> {
          this.loading= false;
          this.error = err.error.message || 'Get All users api failed';

        }
      })
  }


  getUserAccounts(userId :number ) : void {
    this.router.navigate(['/user-get-accts', userId]);
  }

  manageAccount(userId : number): void {
    this.router.navigate(['/user-manage', userId])
  }


  searchUser(id: number) :void {
    this.selectedUser = this.usersList.find(u => u.id === id) || null;
  }
}
