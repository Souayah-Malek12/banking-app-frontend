import { CommonModule } from '@angular/common';
import { TransactionResponse, TransactionService } from './../../services/transService/transaction-service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-transactions-list',
  standalone : true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.scss'
})
export class TransactionsList implements OnInit{

  transactionsList : TransactionResponse[]  = [] ;
  loading = true;
  error: string | null = null;
  filterType: string = '';
  minAmount : number = 0;
  accountId : number= 0;

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


  getFilteredTransaction(): TransactionResponse[] {

    let filteredList = this.transactionsList;


    if(this.accountId  !==0  && this.accountId>0) {
      filteredList =  this.transactionsList.filter( t => (parseFloat(this.accountId.toString()) === t.accountId ) )
    }
    if(this.filterType !==''){
      filteredList =  this.transactionsList.filter(t => (t.type) === this.filterType)
    }

    if(this.minAmount >0){
      filteredList = filteredList.filter( t => t.amount > this.minAmount) ;
    }


    return filteredList;
  }



}
