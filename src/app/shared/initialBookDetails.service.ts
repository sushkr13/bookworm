import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SourceSystemCombinations } from '../models/source-system-combinations';
import { BusinessArea } from '../models/businessarea';
import { BookOpeningType } from '../models/book-opening-type';
import { InitialBookDetails } from '../models/initialbookdetails';
import { CountryTradingLocation } from '../models/country-trading-location';
import { LedgerSetsBook } from '../models/ledger-sets-book';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class InitialBookDetailsService {
  stageOneForm: FormGroup;
  stageTwoForm: FormGroup;
  stageThreeForm: FormGroup;
  sourceSystemList: any;
  newBookDetails: any;
  bookOpenDetail: any;
  bookDetailsStageTwo : any;
  bookDetail : InitialBookDetails[] = [];
  listData = new MatTableDataSource<InitialBookDetails>(this.bookDetail);
  message: string;
 
  constructor(private fb: FormBuilder, private httpClient: HttpClient) { 

    this.stageOneForm = this.fb.group({
      bookOpeningType: ['', Validators.required],
      riskBook: [{value: ''}]
    });

    this.stageTwoForm = this.fb.group({
      caseId: [''],
      dateRequested: [''],
      businessArea: ['', Validators.required],
      requestedBy: [''],
      bookSourceSysAttributes: this.fb.array([this.initBookDetails()])
    });

    

    this.stageThreeForm = this.fb.group ({
      costCentreId: ['', Validators.required],
      costCentreDescription: [''],
      activeIndicator: [''],
      walkerBusinessUnit: [''],
      tradingBankingIndicator: [''],
      countryTradingLocation: ['', Validators.required],
      ledgerSetsBookId: ['', Validators.required],
      legalEntityLevel: [''],
      bookBalanceSheetEntity: [''],
      balanceSheetCity: [''],
      division: [''],
      frontOffice: ['', Validators.required],
      financeCostCentreOwner: [''],
      delegateCostCentreOwner: [''],
      traderId: ['', Validators.required],
      secondaryTrader: [''],
      sourceBookOwner: [''],
      personSearchViewResult: this.fb.array([this.initPersonDetails()]),
      effectiveDate: [new Date().toLocaleDateString()],
      comments: ['', Validators.required],
    });    
  }

  removeSourceSysAttributes(i: number) {
    this.sourceBookFormArray.removeAt(i);
  }

  initPersonDetails() {
    return this.fb.group({
    personid: [''],
    name: [''],
    stage: [''],
    departmentId: [''],
    shortName: [''],
    ntSystemLogin: [''],
    ecdId: [''],
    email: [''],
    functionalAreaAccessCode: [''],
    groupName: [''],
    dataOwnerGroupId: ['']
  });
}

  initBookDetails() {
    return this.fb.group({
      id: new FormControl(0),
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
  
  get sourceBookFormArray(): FormArray
  {
    return this.stageTwoForm.get('bookSourceSysAttributes') as FormArray;
  }

  getBusinessArea()
  {
    return this.httpClient.get<BusinessArea[]>
    ("http://localhost:4000/businessareas")
    .map(result => result.slice());
  }

  getCountryTradingLocation()
  {
    return this.httpClient.get<CountryTradingLocation[]>
    ("http://localhost:4000/countryTradingLocation")
    .map(result => result.slice());
  }

  getLedgerSetsBookId()
  {
    return this.httpClient.get<LedgerSetsBook[]>
    ("http://localhost:4000/ledgerSetsBookId")
    .map(result => result.slice());
  }

  sourceSystemDetails(): Observable<SourceSystemCombinations[]> 
  {
    return this.httpClient.get<SourceSystemCombinations[]>
    ("http://localhost:4000/sourcesystemcombinations")
    .map(result => result.slice());
  }

  getBookOpeningType(): Observable<BookOpeningType[]>
  {
    return this.httpClient.get<BookOpeningType[]>
    ("http://localhost:4000/bookopeningtypes")
    .map(result => result.slice());
  }

  submitInitialBookDetails(bookopeningtype, riskBook)
  {
    this.stageOneForm.value.bookOpeningType = bookopeningtype;
    this.stageOneForm.value.riskBook = riskBook;
  }

  initializeNewBook(caseId, dateRequested, businessArea, requestedBy, bookSourceSysAttributes): Observable<any>
  {
      this.newBookDetails=
      {
         bookOpeningType: this.stageOneForm.value.bookOpeningType, 
         riskBook: this.stageOneForm.value.riskBook,
         caseId: caseId,
         dateRequested: dateRequested,
         businessArea: businessArea,
         requestedBy: requestedBy,         
         bookSourceSysAttributes: bookSourceSysAttributes         
      };

      return this.httpClient.post
      ('http://localhost:4000/initializeNewBook', this.newBookDetails, { observe: 'body' });

  }

  saveBookDetails(
    costCentreId, costCentreDescription, activeIndicator, walkerBusinessUnit,
    tradingBankingIndicator, countryTradingLocation, ledgerSetsBookId,
    legalEntityLevel, bookBalanceSheetEntity, balanceSheetCity,
    division, frontOffice, financeCostCentreOwner, delegateCostCentreOwner,
    traderId, secondaryTrader, sourceBookOwner, personSearchViewResult, effectiveDate, comments
    ): Observable<any>
  {
      console.log("abc" + this.stageTwoForm.value.bookSourceSysAttributes.length);
      console.log(personSearchViewResult);
      this.bookOpenDetail=
      {
         bookOpeningType: this.stageOneForm.value.bookOpeningType, 
         riskBook: this.stageOneForm.value.riskBook,
         caseId: this.stageTwoForm.value.caseId,
         dateRequested: this.stageTwoForm.value.dateRequested,
         businessArea: this.stageTwoForm.value.businessArea,
         requestedBy: this.stageTwoForm.value.requestedBy,         
         bookSourceSysAttributes: this.stageTwoForm.value.bookSourceSysAttributes,
         costCentreId: costCentreId,
         costCentreDescription: costCentreDescription,
         activeIndicator: activeIndicator,
         walkerBusinessUnit: walkerBusinessUnit,
         tradingBankingIndicator: tradingBankingIndicator,
         countryTradingLocation: countryTradingLocation,
         ledgerSetsBookId: ledgerSetsBookId,
         legalEntityLevel: legalEntityLevel,
         bookBalanceSheetEntity: bookBalanceSheetEntity,
         balanceSheetCity: balanceSheetCity,
         division: division,
         frontOffice: frontOffice,
         financeCostCentreOwner: financeCostCentreOwner,
         delegateCostCentreOwner: delegateCostCentreOwner,
         traderId: traderId,
         secondaryTrader: secondaryTrader,
         sourceBookOwner: sourceBookOwner,
         personSearchViewResult: personSearchViewResult,
         effectiveDate: effectiveDate,
         comments: comments   
      };

      return this.httpClient.post
      ('http://localhost:4000/saveBookDetails', this.bookOpenDetail, { observe: 'body' });

  }
}
// initializeFormGroup() {
  //   this.form.setValue({
  //     bookOpeningType: '',
  //     riskBook: false,
  //     caseId: '',
  //     dateRequested: '',
  //     businessArea: '',
  //     requestedBy: '',
  //     isPrimary: false,
  //     isNewLedger: false,
  //     bookName: '',
  //     sourceSystem: '',
  //     sourceSystemLocation: '',
  //     valuationAdjustmentBookType: '',
  //     bookClassification: '',    
  //     glPostingStatus: '',
  //     walkerPostingIndicator: false,
  //     walkerPostingSource: '',
  //     crFeed: false,
  //     mrFeed: false,
  //     confirmationFlag: false,
  //     settlementFlag: ''
  //   });
  // }