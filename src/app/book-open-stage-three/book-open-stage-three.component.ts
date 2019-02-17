import { Component, OnInit, ViewChild, ChangeDetectorRef,ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators ,FormsModule,NgForm } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CostCentreSearchComponent } from '../cost-centre-search/cost-centre-search.component';
import { NotificationService } from '../shared/notification.service';
import { CostCentreSearchService } from '../shared/costCentreSearch.service';
import { PersonSearchComponent } from '../person-search/person-search.component';
import { PersonSearchService } from '../shared/personSearch.service';
import { PersonSearch } from '../models/person-search-details';
import { SelectionModel } from '@angular/cdk/collections';
import { InitialBookDetailsService } from '../shared/initialBookDetails.service';
import { AddTabMenuClickItemService } from '../shared/addtabmenuclickitem.service';
import { RequestSummaryService } from '../shared/requestSummary.service';
import { DialogService } from '../shared/dialog.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
const personSearchData: PersonSearch[] = [];

@Component({
  selector: 'app-book-open-stage-three',
  templateUrl: './book-open-stage-three.component.html',
  styleUrls: ['./book-open-stage-three.component.css'],  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookOpenStageThreeComponent{  
  
  form: FormGroup; 
  personDetail : PersonSearch[] = [];
  approverDetails : any;
  selection = new SelectionModel<PersonSearch>(true, []);
  multiselection = new SelectionModel<PersonSearch>(false, []);
  financeDataSource = new MatTableDataSource<PersonSearch>(this.personDetail);
  marketRiskDataSource = new MatTableDataSource<PersonSearch>(this.personDetail);
  operationsDataSource = new MatTableDataSource<PersonSearch>(this.personDetail);
  creditRiskDataSource = new MatTableDataSource<PersonSearch>(this.personDetail);
  personSearchColumns: string[] = ['select',
  'personid',
  'name',
  'stage',
  'departmentId',
  'shortName',
  'ntSystemLogin',
  'ecdId',
  'email',
  'functionalAreaAccessCode',
  'groupName',
  'dataOwnerGroupId'];
  @ViewChild('costCentreId') costCentreId;
  expandPanel: boolean = true;
  ledgerSetsBookIds: any;
  countryTradingLocations: any;
  
  constructor(private fb: FormBuilder, 
    private costCentreService: CostCentreSearchService,
    private dialog: MatDialog, private tabAddService: AddTabMenuClickItemService,
    private notificationService: NotificationService,
    private personSearchService: PersonSearchService,
    private service:  InitialBookDetailsService, 
    private dialogService: DialogService,    
    private changeDetectorRefs: ChangeDetectorRef,
    private requestSummaryService: RequestSummaryService) 
    { 
      this.service.getLedgerSetsBookId().subscribe(
        data => {
          this.ledgerSetsBookIds = data;
        });
        
        this.service.getCountryTradingLocation().subscribe(
          data => {
            this.countryTradingLocations = data;
          });
          
        }
        
        isAllSelected(approvalType: string) {
          const numSelected = this.selection.selected.length;
          let numRows = 0;
          if(approvalType==='FinanceApproval')
          {
            numRows = this.financeDataSource.data.length;
          }
          else if(approvalType==='MarketRiskApproval')
          {
            numRows = this.marketRiskDataSource.data.length;
          }
          else if(approvalType==='OperationsApproval')
          {
            numRows = this.operationsDataSource.data.length;
          }
          else if(approvalType==='CreditRiskApproval')
          {
            numRows = this.creditRiskDataSource.data.length;
          }
          else
          {
            numRows = 0;
          }
          return numSelected === numRows;
        }
        
        /** Selects all rows if they are not all selected; otherwise clear selection. */
        masterToggle(approvalType: string) {
          if(this.isAllSelected(approvalType))
          {
            this.selection.clear();
          }
          else
          {
            if(approvalType==='FinanceApproval')
            {
              this.financeDataSource.data.forEach(row => this.selection.select(row));
            }
            else if(approvalType==='MarketRiskApproval')
            {
              this.marketRiskDataSource.data.forEach(row => this.selection.select(row));
            }
            else if(approvalType==='OperationsApproval')
            {
              this.operationsDataSource.data.forEach(row => this.selection.select(row));
            }
            else if(approvalType==='CreditRiskApproval')
            {
              this.creditRiskDataSource.data.forEach(row => this.selection.select(row));
            }
            else
            {
              
            }
          }
          
          
        }
        
        onSubmit()
        {    
          //this.costCentreId.nativeElement.focus();  
          /*  Observable.timer(0,900) // only fires when component is alive
          .subscribe(() => {
            this.costCentreId.nativeElement.focus();
          }); */
          if (this.service.stageThreeForm.valid) 
          {
            this.service.stageThreeForm.value.personSearchViewResult= this.approverDetails;
            console.log('Input' + this.service.stageThreeForm.value.personSearchViewResult);
            this.service.saveBookDetails(
              this.service.stageThreeForm.value.costCentreId,
              this.service.stageThreeForm.value.costCentreDescription,
              this.service.stageThreeForm.value.activeIndicator,
              this.service.stageThreeForm.value.walkerBusinessUnit,
              this.service.stageThreeForm.value.tradingBankingIndicator,
              this.service.stageThreeForm.value.countryTradingLocation,
              this.service.stageThreeForm.value.ledgerSetsBookId,
              this.service.stageThreeForm.value.legalEntityLevel,
              this.service.stageThreeForm.value.bookBalanceSheetEntity,
              this.service.stageThreeForm.value.balanceSheetCity,
              this.service.stageThreeForm.value.division,
              this.service.stageThreeForm.value.frontOffice,
              this.service.stageThreeForm.value.financeCostCentreOwner,
              this.service.stageThreeForm.value.delegateCostCentreOwner,
              this.service.stageThreeForm.value.traderId,
              this.service.stageThreeForm.value.secondaryTrader,
              this.service.stageThreeForm.value.sourceBookOwner,
              this.service.stageThreeForm.value.personSearchViewResult,
              this.service.stageThreeForm.value.effectiveDate,
              this.service.stageThreeForm.value.comments
              ).subscribe(
                (result) => 
                { 
                  this.service.stageThreeForm.patchValue({
                    'costCentreId': result.costCentreId,
                    'costCentreDescription': result.costCentreDescription,
                    'activeIndicator': result.activeIndicator,
                    'walkerBusinessUnit': result.walkerBusinessUnit,
                    'tradingBankingIndicator': result.tradingBankingIndicator,
                    'countryTradingLocation': result.countryTradingLocation,
                    'ledgerSetsBookId': result.ledgerSetsBookId,
                    'legalEntityLevel': result.legalEntityLevel,
                    'bookBalanceSheetEntity': result.bookBalanceSheetEntity,
                    'balanceSheetCity': result.balanceSheetCity,
                    'division': result.division,
                    'frontOffice': result.frontOffice,
                    'financeCostCentreOwner': result.financeCostCentreOwner,
                    'delegateCostCentreOwner': result.delegateCostCentreOwner,
                    'traderId': result.traderId,
                    'secondaryTrader': result.secondaryTrader,
                    'sourceBookOwner': result.sourceBookOwner,
                    'personSearchViewResult': result.personSearchViewResult,
                    'effectiveDate': result.effectiveDate,
                    'comments': result.comments
                  });                  
                  this.requestSummaryService.workflowStage = result.workflowStage;
                  this.expandPanel = false;
                  this.changeDetectorRefs.detectChanges();
                  this.tabAddService.tabs.splice(1,1);
                  //  Observable.timer(0,900) // only fires when component is alive
                  //  .subscribe(() => {
                  //    this.costCentreId.nativeElement.focus();
                  //  });        
                  //this.notificationService.success('Submitted successfully'); 
                  //  this.dialogService.openConfirmDialog('Request Id' + this.service.stageTwoForm.value.caseId + 'is successfully created')
                  //  .afterClosed().subscribe(res =>{
                  //   if(res){                
                  //     this.notificationService.warn('! Request Added successfully');
                  //   }
                  // });
                  alert('Request Id ' + this.service.stageTwoForm.value.caseId + ' is successfully created');  
                  this.notificationService.success('Book Initiation Stage is completed for Request Id ' + this.service.stageTwoForm.value.caseId);
                                  
                  this.tabAddService.addTabs("Request Summary - " + this.service.stageTwoForm.value.caseId, null); 
                });
              }    
            }
            
            onCreate(groupName: string, source: string) {
              this.personSearchService.initializeFormGroup();
              console.log(groupName);
              const dialogRef = this.dialog.open(PersonSearchComponent, 
                {
                  disableClose : true,
                  autoFocus : true,
                  width : "60%",
                  height : "80%",
                  data: {
                    groupName: groupName
                  }
                });
                dialogRef.afterClosed().subscribe(
                  val => 
                  {
                    
                    this.personDetail = [];                      
                    switch (groupName) 
                    {
                      case "FrontOffice": 
                      {
                        if(source === "FrontOffice")
                        {
                          this.service.stageThreeForm.get('frontOffice').setValue(this.personSearchService.selectedPersons[0].name);
                          
                        }
                        else
                        {
                          this.service.stageThreeForm.get('sourceBookOwner').setValue(this.personSearchService.selectedPersons[0].name);              
                          this.service.stageThreeForm.get('traderId').setValue(this.personSearchService.selectedPersons[0].name);
                        }
                        break;
                      }
                      case "FinanceApproval": 
                      {
                        if(val!=null)
                        {
                          this.personDetail = val;
                          this.financeDataSource.data = this.financeDataSource.data.concat (this.personDetail);
                          if(this.approverDetails==null)
                          {
                            this.approverDetails=this.personDetail;
                          }
                          else
                          {
                            this.approverDetails=this.approverDetails.concat(this.personDetail);
                          }
                        }
                        break;
                      }
                      case "MarketRiskApproval": 
                      {
                        if(val!=null)
                        {
                          this.personDetail = val;
                          this.marketRiskDataSource.data = this.marketRiskDataSource.data.concat (this.personDetail);
                          if(this.approverDetails==null)
                          {
                            this.approverDetails=this.personDetail;
                          }
                          else
                          {
                            this.approverDetails=this.approverDetails.concat(this.personDetail);
                          }
                        }
                        break;            
                      }
                      case "OperationsApproval": 
                      {
                        if(val!=null)
                        {
                          this.personDetail = val;
                          this.operationsDataSource.data = this.operationsDataSource.data.concat (this.personDetail);
                          if(this.approverDetails==null)
                          {
                            this.approverDetails=this.personDetail;
                          }
                          else
                          {
                            this.approverDetails=this.approverDetails.concat(this.personDetail);
                          }
                        }
                        break;
                      }
                      case "CreditRiskApproval": 
                      {
                        if(val!=null)
                        {
                          this.personDetail = val;
                          this.creditRiskDataSource.data = this.creditRiskDataSource.data.concat (this.personDetail);
                          if(this.approverDetails==null)
                          {
                            this.approverDetails=this.personDetail;
                          }
                          else
                          {
                            this.approverDetails=this.approverDetails.concat(this.personDetail);
                          }
                        }
                        break;
                      }
                    }
                  }                  
                  );
                }
                
                onDelete(groupName: string)
                {  
                  switch (groupName) 
                  {      
                    case "FinanceApproval": 
                    {
                      this.selection.selected.forEach
                      (item => 
                        {     
                          let index: number = this.financeDataSource.data.findIndex(d => d === item);                            
                          this.financeDataSource.data.splice(index,1);                            
                        }
                        );
                        this.financeDataSource = new MatTableDataSource<PersonSearch>(this.financeDataSource.data);
                        
                        break;
                      }
                      case "MarketRiskApproval": 
                      {
                        this.selection.selected.forEach
                        (item => 
                          {     
                            let index: number = this.marketRiskDataSource.data.findIndex(d => d === item);                            
                            this.marketRiskDataSource.data.splice(index,1);                            
                          }
                          );
                          this.marketRiskDataSource = new MatTableDataSource<PersonSearch>(this.marketRiskDataSource.data);
                          
                          break;            
                        }
                        case "OperationsApproval": 
                        {
                          this.selection.selected.forEach
                          (item => 
                            {     
                              let index: number = this.operationsDataSource.data.findIndex(d => d === item);                            
                              this.operationsDataSource.data.splice(index,1);                            
                            }
                            );
                            this.operationsDataSource = new MatTableDataSource<PersonSearch>(this.operationsDataSource.data);
                            break;
                          }
                          case "CreditRiskApproval": 
                          {
                            this.selection.selected.forEach
                            (item => 
                              {     
                                let index: number = this.creditRiskDataSource.data.findIndex(d => d === item);                            
                                this.creditRiskDataSource.data.splice(index,1);                            
                              }
                              );
                              this.creditRiskDataSource = new MatTableDataSource<PersonSearch>(this.creditRiskDataSource.data);
                              break;
                            }
                          }
                          this.changeDetectorRefs.detectChanges();
                        }
                        
                        costCentreSearch() {
                          this.costCentreService.initializeFormGroup();
                          const dialogConfig = new MatDialogConfig();
                          dialogConfig.disableClose = true;
                          dialogConfig.autoFocus = true;
                          dialogConfig.width = "60%";
                          dialogConfig.height = "80%";
                          const dialogRef = this.dialog.open(CostCentreSearchComponent,dialogConfig);
                          dialogRef.afterClosed().subscribe(
                            val => 
                            {
                              
                              this.service.stageThreeForm.get('costCentreId').setValue(this.costCentreService.selectedCostCentre.costCentreId);
                              this.service.stageThreeForm.get('costCentreDescription').setValue(this.costCentreService.selectedCostCentre.costCentreDescription);
                              this.service.stageThreeForm.get('walkerBusinessUnit').setValue(this.costCentreService.selectedCostCentre.walkerBusinessUnit);
                              this.service.stageThreeForm.get('activeIndicator').setValue(this.costCentreService.selectedCostCentre.activeIndicator);
                              this.service.stageThreeForm.get('tradingBankingIndicator').setValue(this.costCentreService.selectedCostCentre.tradingBankingIndicator);
                              this.service.stageThreeForm.get('legalEntityLevel').setValue(this.costCentreService.selectedCostCentre.legalEntityLevel);
                              this.service.stageThreeForm.get('bookBalanceSheetEntity').setValue(this.costCentreService.selectedCostCentre.bookBalanceSheetEntity);
                              this.service.stageThreeForm.get('balanceSheetCity').setValue(this.costCentreService.selectedCostCentre.balanceSheetCity);
                              this.service.stageThreeForm.get('division').setValue(this.costCentreService.selectedCostCentre.division);
                            }
                            );
                          }
                          
                        }
                        