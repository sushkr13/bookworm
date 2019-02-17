import { RequestSummaryService } from '../shared/requestSummary.service';
import { AddTabMenuClickItemService } from '../shared/addtabmenuclickitem.service';
import {Component, OnInit, AfterViewInit, ViewChild, Input, Renderer2} from '@angular/core';
import { MatTableDataSource, MatTable, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { InitialBookDetails } from '../models/initialbookdetails';
import { ApproverDetails } from '../models/approver-details';
import {FormControl} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { TaskApproversComponent } from '../task-approvers/task-approvers.component';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {FocusDirective} from './request-summary.directive';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-request-summary',
  templateUrl: './request-summary.component.html',
  styleUrls: ['./request-summary.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class RequestSummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('myTable') myTable: MatTable<any>;
  requestId = this.tabAddService.getRequestId();
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('bookOpeningType') bookOpeningType;
  initialIndex = 0;
  selectedIndexChanged = false;
  // newBookDetail : InitialBookDetails[] = [];
  // listData = new MatTableDataSource<InitialBookDetails>(this.newBookDetail);
  displayedColumns: string[] = [
    'isPrimary',
    'isNewLedger',
    'bookName',
    'sourceSystem',
    'sourceSystemLocation',
    'valuationAdjustmentBookType',
    'bookClassification',    
    'glPostingStatus',
    'walkerPostingIndicator',
    'walkerPostingSource',
    'crFeed',
    'mrFeed',
    'confirmationFlag',
    'settlementFlag'
  ];
  personDetail : ApproverDetails[] = [];
  approversDataSource = new MatTableDataSource<ApproverDetails>(this.personDetail);
  approversListColumns: string[] = [
    'personid',
    'name',
    'groupName',
    'dataOwnerGroupId'
  ];
  
  constructor(private service: RequestSummaryService, private dialog: MatDialog,
    private tabAddService: AddTabMenuClickItemService, private _formBuilder: FormBuilder
    ) {   
      this.getRequestDetails();
    }
    interval: any;
    ngAfterViewInit()
    {           
      this.stepper.selected=this.stepper.steps.find(i=> i.label === this.service.workflowStage);
      this.initialIndex= this.stepper.selectedIndex;
      this.selectedTab.setValue(this.selectedTabs.length - 1);
      //setTimeout(() => this.bookOpeningType.focus(), 0);
     
       // this.bookOpeningType.nativeElement.focus();
    };

   
    
    selectionChange(stepper: MatStepper)
    {   
      console.log("axasx" + stepper);
        const dialogRef = this.dialog.open(TaskApproversComponent, 
          {
            disableClose : true,
            autoFocus : true,
            width : "33%",
            height : "85%",
            data: {
              stage: ""
            }
          });
          dialogRef.afterClosed().subscribe(
            val => 
            {            
              console.log("Data displayed" + val);
            }
          );                      
      }      

        selected= new FormControl(0);
        @Input() selectedTab : any;
        @Input() selectedTabs : any;  
        
        
        firstFormGroup: FormGroup;
        secondFormGroup: FormGroup;
        thirdFormGroup: FormGroup;
        fourthFormGroup: FormGroup;
        fifthFormGroup: FormGroup;
        sixthFormGroup: FormGroup;
        seventhFormGroup: FormGroup;
        
        ngOnInit() {
          this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['']
          });
          this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['']
          });
          this.thirdFormGroup = this._formBuilder.group({
            thirdCtrl: ['']
          });
          this.fourthFormGroup = this._formBuilder.group({
            fourthCtrl: ['']
          });
          this.fifthFormGroup = this._formBuilder.group({
            fifthCtrl: ['']
          });
          this.sixthFormGroup = this._formBuilder.group({
            sixthCtrl: ['']
          });
          this.seventhFormGroup = this._formBuilder.group({
            seventhCtrl: ['']
          });
        }
        
        
        onClear(stepper: MatStepper)
        {
          this.selectedIndexChanged=true;
          this.stepper.selected.completed=false;
          stepper.previous();
        }
        
        onSubmit(stepper: MatStepper)
        {
          this.selectedIndexChanged=true;
          stepper.next();
        }
        
        getRequestDetails()
        {
          this.service.getRequestDetails(this.requestId).subscribe(
            (result) => 
            {         
              let book_Details: InitialBookDetails[] = [];
              let approver_Details: ApproverDetails[] = [];
              this.service.requestSummaryForm.get('bookOpeningType').setValue(result.bookOpeningType);
              this.service.requestSummaryForm.get('riskBook').setValue(result.riskBook);
              this.service.requestSummaryForm.get('ledgerBookId').setValue(" ");
              this.service.requestSummaryForm.get('caseId').setValue(result.caseId);
              this.service.requestSummaryForm.get('dateRequested').setValue(result.dateRequested);
              this.service.requestSummaryForm.get('businessArea').setValue(result.businessArea);
              this.service.requestSummaryForm.get('requestedBy').setValue(result.requestedBy);
              this.service.requestSummaryForm.get('workflowToolBookLinkingId').setValue("  ");
              this.service.requestSummaryForm.get('numberOfSourceBooks').setValue(result.bookSourceSysAttributes.length);
              this.service.requestSummaryForm.get('requestStatus').setValue("PENDING");
              this.service.requestSummaryForm.get('userAccessId').setValue("  ");
              this.service.requestSummaryForm.get('costCentreId').setValue(result.costCentreId);
              this.service.requestSummaryForm.get('costCentreDescription').setValue(result.costCentreDescription);
              this.service.requestSummaryForm.get('activeIndicator').setValue(result.activeIndicator);
              this.service.requestSummaryForm.get('walkerBusinessUnit').setValue(result.walkerBusinessUnit);        
              this.service.requestSummaryForm.get('tradingBankingIndicator').setValue(result.tradingBankingIndicator);
              this.service.requestSummaryForm.get('countryTradingLocation').setValue(result.countryTradingLocation);
              this.service.requestSummaryForm.get('ledgerSetsBookId').setValue(result.ledgerSetsBookId);
              this.service.requestSummaryForm.get('legalEntityLevel').setValue(result.legalEntityLevel);
              this.service.requestSummaryForm.get('bookBalanceSheetEntity').setValue(result.bookBalanceSheetEntity);
              this.service.requestSummaryForm.get('balanceSheetCity').setValue(result.balanceSheetCity);
              this.service.requestSummaryForm.get('division').setValue(result.division);
              this.service.requestSummaryForm.get('frontOffice').setValue(result.frontOffice);
              this.service.requestSummaryForm.get('financeCostCentreOwner').setValue(result.financeCostCentreOwner);
              this.service.requestSummaryForm.get('delegateCostCentreOwner').setValue(result.delegateCostCentreOwner);
              this.service.requestSummaryForm.get('traderId').setValue(result.traderId);
              this.service.requestSummaryForm.get('secondaryTrader').setValue("  ");
              this.service.requestSummaryForm.get('sourceBookOwner').setValue(result.traderId);
              this.service.requestSummaryForm.get('effectiveDate').setValue(result.effectiveDate);
              this.service.requestSummaryForm.get('comments').setValue(result.comments);
              this.service.requestSummaryForm.get('workflowStage').setValue(result.workflowStage);
              for(let i=0;i<result.bookSourceSysAttributes.length; i++)
              {                    
                book_Details[i] =
                {           
                  id: result.bookSourceSysAttributes[i].id,
                  isPrimary: result.bookSourceSysAttributes[i].isPrimary,
                  isNewLedger: result.bookSourceSysAttributes[i].isNewLedger,
                  bookName: result.bookSourceSysAttributes[i].bookName,
                  sourceSystem: result.bookSourceSysAttributes[i].sourceSystem,
                  sourceSystemLocation: result.bookSourceSysAttributes[i].sourceSystemLocation,
                  valuationAdjustmentBookType: result.bookSourceSysAttributes[i].valuationAdjustmentBookType,
                  bookClassification: result.bookSourceSysAttributes[i].bookClassification,    
                  glPostingStatus: result.bookSourceSysAttributes[i].glPostingStatus,
                  walkerPostingIndicator: result.bookSourceSysAttributes[i].walkerPostingIndicator,
                  walkerPostingSource: result.bookSourceSysAttributes[i].walkerPostingSource,
                  crFeed: result.bookSourceSysAttributes[i].crFeed,
                  mrFeed: result.bookSourceSysAttributes[i].mrFeed,
                  confirmationFlag: result.bookSourceSysAttributes[i].confirmationFlag,
                  settlementFlag: result.bookSourceSysAttributes[i].settlementFlag
                };       
                if(book_Details[i].isPrimary === true)
                {       
                  this.service.requestSummaryForm.get('primaryBookName').setValue(book_Details[i].bookName);
                }
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].isPrimary = result.bookSourceSysAttributes[i].isPrimary;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].isNewLedger = result.bookSourceSysAttributes[i].isNewLedger;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].bookName = result.bookSourceSysAttributes[i].bookName;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].sourceSystem = result.bookSourceSysAttributes[i].sourceSystem;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].sourceSystemLocation = result.bookSourceSysAttributes[i].sourceSystemLocation;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].valuationAdjustmentBookType = result.bookSourceSysAttributes[i].valuationAdjustmentBookType;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].bookClassification = result.bookSourceSysAttributes[i].bookClassification;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].glPostingStatus = result.bookSourceSysAttributes[i].glPostingStatus;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].walkerPostingIndicator = result.bookSourceSysAttributes[i].walkerPostingIndicator;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].walkerPostingSource = result.bookSourceSysAttributes[i].walkerPostingSource;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].crFeed = result.bookSourceSysAttributes[i].crFeed;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].mrFeed = result.bookSourceSysAttributes[i].mrFeed;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].confirmationFlag = result.bookSourceSysAttributes[i].confirmationFlag;
                // this.service.requestSummaryForm.value.bookSourceSysAttributes[i].settlementFlag = result.bookSourceSysAttributes[i].settlementFlag;
              }     
              //console.log(this.service.requestSummaryForm.value.bookSourceSysAttributes.length);
              this.service.listData = new MatTableDataSource<InitialBookDetails>(book_Details);
              this.myTable.renderRows(); 
              for(let i=0;i<result.personSearchViewResult.length; i++)
              {                    
                approver_Details[i] =
                {                        
                  personid: result.personSearchViewResult[i].personid,
                  name: result.personSearchViewResult[i].name,
                  groupName: result.personSearchViewResult[i].groupName,
                  dataOwnerGroupId: result.personSearchViewResult[i].dataOwnerGroupId
                };       
                // this.service.requestSummaryForm.value.personSearchViewResult[i].personid = result.personSearchViewResult[i].personid;
                // this.service.requestSummaryForm.value.personSearchViewResult[i].personName = result.personSearchViewResult[i].personName;
                // this.service.requestSummaryForm.value.personSearchViewResult[i].groupName = result.personSearchViewResult[i].groupName;
                // this.service.requestSummaryForm.value.personSearchViewResult[i].dataOwnerGroupId = result.personSearchViewResult[i].dataOwnerGroupId;
              }     
              // console.log(this.service.requestSummaryForm.value.personSearchViewResult.length);
              this.service.approversDataSource = new MatTableDataSource<ApproverDetails>(approver_Details);
            }
            )
          }
        }
        