import { CommonModule } from '@angular/common';
import { TransactionResponse, TransactionService } from './../../services/transService/transaction-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-list',
  standalone : true,
  imports: [CommonModule],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.scss'
})
export class TransactionsList implements OnInit{

  transactionsList : TransactionResponse[]  = [] ;
  loading = true;
  error: string | null = null;


  constructor(private transactionService :TransactionService ){}

  ngOnInit(): void {
    this.loading = true;
    this.transactionService.getAllTransaction().subscribe({

      next : (res : TransactionResponse[])=> {
        this.loading = false;
        this.transactionsList = res;
        console.log("tansacytionsnsnsns", res)
      },

      error : (err)=> {
        this.error = err.error.message;
        this.loading = false;
      }


    })

  }


}
