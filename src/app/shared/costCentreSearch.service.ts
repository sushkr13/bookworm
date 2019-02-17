import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CostCentreDetails } from '../models/cost-centre-details';
import { BusinessArea } from '../models/businessarea';
import { BookOpeningType } from '../models/book-opening-type';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CostCentreSearchService {

  constructor(private httpClient: HttpClient) { }

  //employeeList: AngularFireList<any>;
  costCentreDetails: any;
  selectedCostCentre: any;

  form: FormGroup = new FormGroup({
    costCentreId: new FormControl(''),
    costCentreDescription: new FormControl(''),
    walkerBusinessUnit: new FormControl(''),
    hcsEntity: new FormControl(''),
    usPeopleNumber: new FormControl(''),
    currency: new FormControl(''),
    legalEntityId: new FormControl(''),
    location: new FormControl(''),
    tradingBankingIndicator: new FormControl(''),   
    syntheticCostCenter: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      costCentreId: '',
      costCentreDescription: '',
      walkerBusinessUnit: '',
      hcsEntity: '',
      usPeopleNumber: '',
      currency: '',
      legalEntityId: '',
      location: '',
      tradingBankingIndicator: '',   
      syntheticCostCenter: false
    });
  }


  getEmployees() {
    //this.employeeList = this.firebase.list('employees');
    //return this.employeeList.snapshotChanges();
    return null;
  }

  costcentresearchbyid(costCentreId: string): Observable<CostCentreDetails[]> 
  {
    let params = new HttpParams().set("costCentreId",costCentreId);
    return this.httpClient.get<CostCentreDetails[]>
    ("http://localhost:4000/costcentresearchbyid", {params: params});
  }
  
  costcentresearch(costCentreId: string,
    costCentreDescription: string,
    walkerBusinessUnit: string,
    hcsEntity: string,
    usPeopleNumber: string,
    currency: string,
    legalEntityId: string,
    location: string,
    tradingBankingIndicator: string,
    syntheticCostCenter: string
  ): Observable<CostCentreDetails[]> 
  {
    let params = new HttpParams().set("costCentreId",costCentreId);
    return this.httpClient.get<CostCentreDetails[]>
    ("http://localhost:4000/costcentresearch", {params: params})
  }

 

  deleteEmployee($key: string) {
    //this.employeeList.remove($key);
  }

  populateForm(employee) {
    //this.form.setValue(_.omit(employee,'departmentName'));
  }
}
