import {Component, OnInit, AfterViewInit, ViewChild, Input, ChangeDetectorRef} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatTable, MatTableModule } from '@angular/material';
import { AddBookStageTwoComponent } from '../add-book-stage-two/add-book-stage-two.component';
import { NotificationService } from '../shared/notification.service';
import { InitialBookDetailsService } from '../shared/initialBookDetails.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SourceSystemCombinations } from '../models/source-system-combinations';
import { InitialBookDetails } from '../models/initialbookdetails';
import { AddTabMenuClickItemService } from '../shared/addtabmenuclickitem.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogService } from '../shared/dialog.service';

@Component({
  selector: 'app-book-open-stage-two',
  templateUrl: './book-open-stage-two.component.html',
  styleUrls: ['./book-open-stage-two.component.css']
})
export class BookOpenStageTwoComponent implements OnInit {
  @Input() childStageTwoTabs: any;
  @Input() selected: any;
  sourceSystemCombinationColumns: string[] = ['parentsourcesystem', 'additionalsourcesystem'];
  tempData : SourceSystemCombinations[] = [];
  businessAreas: any; 
  listdataSource = new MatTableDataSource<SourceSystemCombinations>(this.tempData);
  form: FormGroup;
  panelOpenState = true;
  newBookDetail : InitialBookDetails[] = [];
  listData = new MatTableDataSource<InitialBookDetails>(this.newBookDetail);
  @ViewChild('myTable') myTable: MatTable<any>;
  displayedColumns: string[] = [
    'actions',
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
  selection = new SelectionModel<InitialBookDetails>(true, []);
  element: InitialBookDetails[] = []; 
  bookSourceSysAttributes: FormArray;
  
  constructor (private dialog: MatDialog, 
    private service: InitialBookDetailsService,    
    private notificationService: NotificationService, 
    private changeDetectorRefs: ChangeDetectorRef,
    private tabAddService: AddTabMenuClickItemService,
    private fb: FormBuilder) 
    { 
      this.service.sourceSystemDetails().subscribe(
        data => {
          this.tempData = data;
          this.listdataSource.data = this.tempData; 
        });
        
        this.service.getBusinessArea().subscribe(
          data => {
            this.businessAreas = data;
          });
        } 
        
        delete (row)
        {
          if(row.isPrimary === false)
          {
            let bookDetails : InitialBookDetails[] = [];
            if(this.service.listData.data.length!=1)
            {
              let j=0;
              for (let i=0;i<this.service.listData.data.length;i++)
              {
                if(row.id!=i)
                {                
                  bookDetails.push(this.service.listData.data[i]);
                  bookDetails[j].id = j;
                  j++;
                }
              }                 
            }
            else
            {
              bookDetails.push(this.service.listData.data[0]);
            }
            this.service.listData.data = bookDetails;
            this.changeDetectorRefs.detectChanges();
            this.notificationService.warn('Deleted successfully');
          }
        }
        
        edit (row)
        {
          console.log(row.id);
          const dialogRef = this.dialog.open(AddBookStageTwoComponent, 
            {
              disableClose : true,
              autoFocus : true,
              width : "60%",
              height : "80%",
              data: {
                index: row.id,
                editMode: true,
                selectedData: this.service.listData.data
              }
            });
            dialogRef.afterClosed().subscribe(
              val => 
              {
                // this.selection.selected.forEach
                // (item => {     
                //let index: number = this.service.listData.data.findIndex(d => d.id === id);
                //this.service.listData.data.splice(row.id,1);                  
                // }); 
                if(val!=null)
                {
                  let bookDetails : InitialBookDetails[] = [];
                  for (let i=0;i<this.service.listData.data.length;i++)
                  {
                    if(row.id===i)
                    {
                      bookDetails.push(val);
                    }
                    else
                    {
                      bookDetails.push(this.service.listData.data[i]);
                    }
                  }
                  //this.newBookDetail = val;
                  this.service.listData.data = [];
                  //bookDetails;
                  this.service.listData.data = this.service.listData.data.concat (bookDetails);
                  this.changeDetectorRefs.detectChanges();
                } }
                );
                
              }
              
              
              
              ngOnInit() { }
              
              isAllSelected() 
              {
                const numSelected = this.selection.selected.length;
                const numRows = this.service.listData.data.length;
                return numSelected === numRows;
              }            
             
              
              masterToggle() 
              {
                this.isAllSelected() ?
                this.selection.clear() :
                this.service.listData.data.forEach(row => this.selection.select(row));
              }
              
              onCreate() 
              {
                const dialogRef = this.dialog.open(AddBookStageTwoComponent, 
                  {
                    disableClose : true,
                    autoFocus : true,
                    width : "60%",
                    height : "80%",
                    data: {
                      index: this.service.listData.data.length,
                      editMode: false
                    }
                  });
                  dialogRef.afterClosed().subscribe(
                    val => 
                    {
                      if(val!=null)
                      {
                        this.newBookDetail = val;
                        let fg = this.fb.group(this.newBookDetail);
                        this.bookSourceSysAttributes = this.service.stageTwoForm.get('bookSourceSysAttributes') as FormArray;
                        this.bookSourceSysAttributes.push(fg);
                        this.service.listData.data = this.service.listData.data.concat (this.newBookDetail);
                      }               
                    }
                    );
                  } 
                  
                 
                      
                      onSubmit()
                      {            
                        //if (this.service.stageTwoForm.valid) {
                        this.service.initializeNewBook(
                          '', '', this.service.stageTwoForm.value.businessArea,'',
                          this.service.listData.data
                          ).subscribe(
                            (result) => 
                            { 
                              let book_Details: InitialBookDetails[] = []; 
                              this.service.stageTwoForm.get('caseId').setValue(result.caseId);
                              this.service.stageTwoForm.get('requestedBy').setValue(result.requestedBy);
                              this.service.stageTwoForm.get('dateRequested').setValue(result.dateRequested);
                              this.service.stageTwoForm.get('businessArea').setValue(result.businessArea);
                              this.service.removeSourceSysAttributes(result.bookSourceSysAttributes.length);
                              console.log(this.service.stageTwoForm.value.bookSourceSysAttributes.length);
                              for(let i=0;i<result.bookSourceSysAttributes.length; i++)
                              {                    
                                book_Details[i] =
                                {            
                                  id: i,
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
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].id = result.bookSourceSysAttributes[i].id;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].isPrimary = result.bookSourceSysAttributes[i].isPrimary;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].isNewLedger = result.bookSourceSysAttributes[i].isNewLedger;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].bookName = result.bookSourceSysAttributes[i].bookName;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].sourceSystem = result.bookSourceSysAttributes[i].sourceSystem;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].sourceSystemLocation = result.bookSourceSysAttributes[i].sourceSystemLocation;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].valuationAdjustmentBookType = result.bookSourceSysAttributes[i].valuationAdjustmentBookType;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].bookClassification = result.bookSourceSysAttributes[i].bookClassification;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].glPostingStatus = result.bookSourceSysAttributes[i].glPostingStatus;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].walkerPostingIndicator = result.bookSourceSysAttributes[i].walkerPostingIndicator;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].walkerPostingSource = result.bookSourceSysAttributes[i].walkerPostingSource;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].crFeed = result.bookSourceSysAttributes[i].crFeed;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].mrFeed = result.bookSourceSysAttributes[i].mrFeed;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].confirmationFlag = result.bookSourceSysAttributes[i].confirmationFlag;
                                this.service.stageTwoForm.value.bookSourceSysAttributes[i].settlementFlag = result.bookSourceSysAttributes[i].settlementFlag;
                              }     
                              console.log(this.service.stageTwoForm.value.bookSourceSysAttributes.length);
                              this.service.listData = new MatTableDataSource<InitialBookDetails>(book_Details);
                              this.myTable.renderRows(); 
                              this.notificationService.success('Submitted successfully');
                              this.tabAddService.addTabs('Book Details Stage 3',this.childStageTwoTabs); 
                              this.selected.setValue(this.childStageTwoTabs.length - 1);
                            });
                          }              
                        }
                        
                        
                        