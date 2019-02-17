import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddTabMenuClickItemService } from '../shared/addtabmenuclickitem.service';
import { InitialBookDetailsService } from '../shared/initialBookDetails.service';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, 
  private tabAddService: AddTabMenuClickItemService,
  private service:InitialBookDetailsService,
  public dialogRef: MatDialogRef<MatConfirmDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog() { 
      
    this.dialogRef.close(false);
    this.tabAddService.addTabs("Request Summary - " + this.service.stageTwoForm.value.caseId, null);
  }

}
