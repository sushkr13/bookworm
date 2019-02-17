import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PersonSearch } from '../models/person-search-details';
import { BusinessArea } from '../models/businessarea';
import { BookOpeningType } from '../models/book-opening-type';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonSearchService {

  selectedPersons : any;
  constructor(private httpClient: HttpClient) { }

  form: FormGroup = new FormGroup({
    personid: new FormControl(''),
    ecdId: new FormControl(''),
    name: new FormControl(''),
    ntSystemLogin: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      personid: '',
      ecdId: '',
      name: '',
      ntSystemLogin: '',
    });
  }

  personSearchDetails(groupName, personid, ecdId, name, ntSystemLogin):Observable<PersonSearch[]> 
  {
    let params = new HttpParams().set("groupName",groupName)
    .set("personid",personid).set("ecdId",ecdId)
    .set("name",name).set("ntSystemLogin",ntSystemLogin);
    return this.httpClient.get<PersonSearch[]>
    ("http://localhost:4000/personsearch", {params: params});
  }

 
}
