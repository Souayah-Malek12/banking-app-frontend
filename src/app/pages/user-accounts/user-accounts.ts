import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService, UserResponse } from '../../services/userService/users-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone : true,
  imports : [CommonModule],
  templateUrl: './user-accounts.html',
  styleUrls: ['./user-accounts.scss']
})
export class UserPage implements OnInit {

  loading = false;
  error: string | null = null;
  user: UserResponse | null = null;
  showTransactions: boolean[] = [];

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

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

        if (this.user.accounts) {
          this.showTransactions = new Array(this.user.accounts.length).fill(false);
        }

      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to load the account';
      }
    });
  }


  // In your component

toggleTransactions(i: number) {
  this.showTransactions[i] = !this.showTransactions[i];
}

}
