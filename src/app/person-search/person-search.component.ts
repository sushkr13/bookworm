import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { PersonSearchService } from '../shared/personSearch.service';
import { PersonSearch } from '../models/person-search-details';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {
  personSearchData: PersonSearch[] = [];  
  selection = new SelectionModel<PersonSearch>(false, []);
  multiselection = new SelectionModel<PersonSearch>(true, []);
  dataSource = new MatTableDataSource<PersonSearch>(this.personSearchData);
  multiSelectFlag = false;
  
  personSearchColumns: string[] = [
    'select',
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
    
    
    constructor(private service: PersonSearchService,
      public dialogRef: MatDialogRef<PersonSearchComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { 

        if(data.groupName === "FrontOffice")
        {
          this.multiSelectFlag = false;
        }
        else
        {
          this.multiSelectFlag = true;
        }

      }
      
      ngOnInit() {
        
      }
      onClose() {
        this.dialogRef.close();
      }
      
      onClear() {
        this.service.form.reset();
        this.service.initializeFormGroup();
      }
      
      /** Whether the number of selected elements matches the total number of rows. */
      isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
      }
      
      /** Selects all rows if they are not all selected; otherwise clear selection. */
      masterToggle() {
        if(this.isAllSelected())
        {
          this.selection.clear();
        }
        else
        {
          this.dataSource.data.forEach(row => this.selection.select(row));
        }
        
      }

            /** Whether the number of selected elements matches the total number of rows. */
      isMultiOptionSelected() 
      {
          const numSelected = this.multiselection.selected.length;
          const numRows = this.dataSource.data.length;
          return numSelected === numRows;
      }
            
            /** Selects all rows if they are not all selected; otherwise clear selection. */
      multioptionmasterToggle() 
      {
              if(this.isAllSelected())
              {
                this.multiselection.clear();
              }
              else
              {
                this.dataSource.data.forEach(row => this.multiselection.select(row));
              }
              
      }
      
      getData() {
        this.service.personSearchDetails(
          this.data.groupName,
          this.service.form.value.personid,
          this.service.form.value.ecdId,
          this.service.form.value.name,
          this.service.form.value.ntSystemLogin
        ).subscribe(
          data => {
            this.personSearchData = data;
            this.dataSource.data = this.dataSource.data.concat (this.personSearchData); 
          });
        }
        
        submitData() 
        {
          if(this.data.groupName === "FrontOffice")
          {
            if(this.selection!=null && this.selection.selected!=null)
            {
              if (this.service.form.valid) 
              {
                this.service.selectedPersons=this.selection.selected; 
                this.dialogRef.close(this.service.selectedPersons);
              }
            }
          }
          else
          {
            if(this.multiselection!=null && this.multiselection.selected!=null)
            {
              if (this.service.form.valid) 
              {
                this.service.selectedPersons=this.multiselection.selected; 
                this.dialogRef.close(this.service.selectedPersons);
              }
            }
          }
          
        }
        
      }
      