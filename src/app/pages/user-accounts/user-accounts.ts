import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService, UserResponse } from '../../services/userService/users-service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-accounts.html',
  styleUrls: ['./user-accounts.scss']
})
export class UserPage implements OnInit {

  loading = false;
  error: string | null = null;
  user: UserResponse | null = null;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
    console.log(id,"eeaez")
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
}
