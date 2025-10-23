import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { CreateUser } from './pages/create-user/create-user';
import { UsersList } from './pages/users-list/users-list';
import { UserPage } from './pages/user-accounts/user-accounts';
import { UserManage } from './pages/user-manage/user-manage';
import { TransactionsList } from './pages/transactions-list/transactions-list';

export const routes: Routes = [

  {path:'login', component: Login},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'register', component : Register},


  {path: 'user-get-accts/:id', component : UserPage },



  {path: 'create-u', component : CreateUser},
  {path: 'get-all-u', component : UsersList},
  {path: 'user-manage/:id', component : UserManage},
  {path: 'tx', component : TransactionsList},



];
