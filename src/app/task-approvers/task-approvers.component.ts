import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatTable } from '@angular/material';
import { RequestSummaryService } from '../shared/requestSummary.service';
import { TaskApprovers } from '../models/task-approvers';

@Component({
  selector: 'app-task-approvers',
  templateUrl: './task-approvers.component.html',
  styleUrls: ['./task-approvers.component.css']
})
export class TaskApproversComponent implements OnInit {


  title: string;
  approverColumns: string[] = ['displayName','userName','role'];
  tempData : TaskApprovers[] = [];
  dataSource = new MatTableDataSource<TaskApprovers>(this.tempData);

  constructor(private service: RequestSummaryService,
    public dialogRef: MatDialogRef<TaskApproversComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {       
    this.title = "Permitted Actors";  
    this.service.getApproverDetails(this.title).subscribe(
      data => {
        this.tempData = data;
        this.dataSource.data = this.tempData; 
      });
  }   

  ngOnInit() 
  {

  } 


  onClose() 
  {
    this.dialogRef.close();          
  }
}

