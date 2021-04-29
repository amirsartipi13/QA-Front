import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

import {MatSnackBar} from '@angular/material/snack-bar';
import {Answer} from 'src/app/shared/answer.model';
import {Question} from 'src/app/shared/question.model';
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
  public show =false
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor(private _httpClient: HttpClient,private _snackBar: MatSnackBar) { 

  }
  ngOnInit(): void {
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
          this.answer=res
          this.show =false
          console.log('s')
        },
        err => { 
          this._snackBar.open(err.error.detail[0].msg, 'فهمیدم');
          this.show = false
        }
      );
    }
  }
  
}



