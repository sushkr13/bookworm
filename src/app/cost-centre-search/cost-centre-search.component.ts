import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatTable, MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CostCentreSearchService } from '../shared/costCentreSearch.service';
import { CostCentreDetails } from '../models/cost-centre-details';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-cost-search',
  templateUrl: './cost-centre-search.component.html',
  styleUrls: ['./cost-centre-search.component.css']
})
export class CostCentreSearchComponent implements OnInit {
  
  costCentreSearchColumns: string[] = 
  ['select',
  'costCentreId',
  'costCentreDescription',
  'walkerBusinessUnit',
  'hcsEntity',
  'usPeopleNumber',
  'currency',
  'legalEntityId',
  'location',
  'tradingBankingIndicator',
  'syntheticCostCenter'];
  tempData : CostCentreDetails[] = [];
  selection = new SelectionModel<CostCentreDetails>(false, []);
  dataSource = new MatTableDataSource<CostCentreDetails>(this.tempData);
  @ViewChild(MatTable) table: MatTable<any>;
  
  constructor(private service: CostCentreSearchService,
    public dialogRef: MatDialogRef<CostCentreSearchComponent>) { }
    
    ngOnInit() {
      //this.service.getEmployees();
    }
    
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
    
    onClear() {
      this.service.form.reset();
      this.service.initializeFormGroup();
    }
    
    getData(costCentreId:string) {
      if (this.service.form.valid) {
        this.service.costcentresearch(
          this.service.form.value.costCentreId,
          this.service.form.value.costCentreDescription,
          this.service.form.value.walkerBusinessUnit,
          this.service.form.value.hcsEntity,
          this.service.form.value.usPeopleNumber,
          this.service.form.value.currency,
          this.service.form.value.legalEntityId,
          this.service.form.value.location,
          this.service.form.value.tradingBankingIndicator,
          this.service.form.value.syntheticCostCenter
        ).subscribe(
          data => {
            console.log(data);
            this.tempData = data;
            this.dataSource.data = this.dataSource.data.concat (this.tempData); 
          });
        }
      }
      
      submitData ()
      {
        if(this.selection!=null && this.selection.selected!=null)
        {
          if (this.service.form.valid) 
          {
            this.service.costcentresearchbyid(
              this.selection.selected[0].costCentreId
            ).subscribe(
              data => {
                this.service.selectedCostCentre=data; 
                this.dialogRef.close();
              });              
          }
        }
      }
        
      onClose() 
      {
        this.dialogRef.close();
      }
        
}
      