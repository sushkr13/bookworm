import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SourceSystemCombinations } from '../models/source-system-combinations';
import { BusinessArea } from '../models/businessarea';
import { BookOpeningType } from '../models/book-opening-type';
import { InitialBookDetails } from '../models/initialbookdetails';
import { BookOpenDetails } from '../models/book-open-details';
import {map} from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName: string;
  ringFenceMarker: string;
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  form: FormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    domain: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      userId: '',
      password: '',
      domain: ''
    });
  }
  
  
  login(userId, password, domain): Observable<any>
  {
      const requestBody =
      {
         userId, 
         password,
         domain         
      };     
      return this.httpClient.post
      ('http://localhost:4000/authenticateUser', requestBody, { observe: 'body' });
      // this.loggedIn=true;
      // this.router.navigate(["home"]);
  }
  
  loggedIn = false;

  isAuthenticated()
  {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
         resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }
  
}
