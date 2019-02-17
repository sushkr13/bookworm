import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { InitialBookDetails } from '../models/initialbookdetails';
import { MatTableDataSource } from '@angular/material';
import { ApproverDetails } from '../models/approver-details';

@Injectable({
  providedIn: 'root'
})
export class RequestSummaryService {

  bookDetail : InitialBookDetails[] = [];
  listData = new MatTableDataSource<InitialBookDetails>(this.bookDetail);
  personDetails : ApproverDetails[] = [];
  approversDataSource = new MatTableDataSource<ApproverDetails>(this.personDetails);
  message: string;
  requestSummaryForm: FormGroup;
  workflowStage: string;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { 

    this.requestSummaryForm = this.fb.group({
      bookOpeningType: [''],
      riskBook: [''],
      ledgerBookId: [''],
      caseId: [''],
      dateRequested: [''],
      businessArea: [''],
      requestedBy: [''],
      workflowToolBookLinkingId: [''],
      numberOfSourceBooks: [''],
      primaryBookName: [''],
      requestStatus: [''],
      userAccessId: [''],
      bookSourceSysAttributes: this.fb.array([this.initBookDetails()]),
      costCentreId: [''],
      costCentreDescription: [''],
      activeIndicator: [''],
      walkerBusinessUnit: [''],
      tradingBankingIndicator: [''],
      countryTradingLocation: [''],
      ledgerSetsBookId: [''],
      legalEntityLevel: [''],
      bookBalanceSheetEntity: [''],
      balanceSheetCity: [''],
      division: [''],
      frontOffice: [''],
      financeCostCentreOwner: [''],
      delegateCostCentreOwner: [''],
      traderId: [''],
      secondaryTrader: [''],
      sourceBookOwner: [''],
      personSearchViewResult: this.fb.array([this.initPersonDetails()]),
      effectiveDate: [''],
      comments: [''],
      workflowStage: ['']
    });    
  }


  initPersonDetails() {
    return this.fb.group({
    personid: new FormControl(''),
    name: new FormControl(''),
    groupName: new FormControl(''),
    dataOwnerGroupId: new FormControl('')
  });
}

  initBookDetails() {
    return this.fb.group({
      isPrimary: new FormControl(''),
      isNewLedger: new FormControl(''),
      bookName: new FormControl(''),
      sourceSystem: new FormControl(''),
      sourceSystemLocation: new FormControl(''),
      valuationAdjustmentBookType: new FormControl(''),
      bookClassification: new FormControl(''),   
      glPostingStatus: new FormControl(''),
      walkerPostingIndicator: new FormControl(''),
      walkerPostingSource: new FormControl(''),
      crFeed: new FormControl(''),
      mrFeed: new FormControl(''),
      confirmationFlag: new FormControl(''),
      settlementFlag: new FormControl('')
    });
}
  
  get requestSummaryFormArray(): FormArray
  {
    return this.requestSummaryForm.get('bookSourceSysAttributes') as FormArray;
  }

  getRequestDetails(requestId): Observable<any>
  {      
    console.log("dcsc" + requestId);
      return this.httpClient.post
      ('http://localhost:4000/getRequestDetails', requestId, { observe: 'body' });
  }

  getApproverDetails(stage: string): Observable<any>
  {      
    console.log("stage" + stage);
      return this.httpClient.get
      ('http://localhost:4000/getApproverDetails', { observe: 'body' });
  }

}
