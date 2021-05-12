import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

import {MatSnackBar} from '@angular/material/snack-bar';
import {Answer} from 'src/app/shared/answer.model';
import {Question} from 'src/app/shared/question.model';
import { Detail } from 'src/app/shared/detail.model';
/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public question = new Question();
  public answer = new Answer();
  public anss= new Array();
  public show =false
  constructor(private _httpClient: HttpClient,private _snackBar: MatSnackBar) { 

  }
  ngOnInit(): void {
  }
  someMethod(event:any){
    if(event.keyCode == 13){
      this.get_answer()
    }
  }

  get_answer():void{
    const href = 'http://test.ui-bigdata.ir';
    const requestUrl = `${href}/${'detailed'}`;
    if(!this.question.question){
      this._snackBar.open('برای گرفتن جواب، سوال الزامی است!', 'فهمیدم');
    }else{
      this.show =true
      this._httpClient.post<Answer>(requestUrl, this.question).subscribe(
        res => {
          this.anss = []
          // console.log(res.details)
          // var details = res.details.sort((a, b) => (a.ansScoreMoz > b.ansScoreMoz) ? 1 : -1)
          // console.log(details)
          for (let entry of res.details) {
            this.anss.push(entry.answer)
          }
          this.anss = this.anss.filter((v, i, a) => a.indexOf(v) === i);
          this.anss = this.anss.filter(obj => obj !== "#NO_ANSWER#");

          this.show =false
          // console.log('s')
        },
        err => { 
          this._snackBar.open(err.error.detail[0].msg, 'فهمیدم');
          this.show = false
        }
      );
    }
  }
  
}



