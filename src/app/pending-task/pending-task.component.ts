import { Component, OnInit, ViewChild } from '@angular/core';
import { PendingTasksService } from '../shared/pendingTasks.service';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms';
import { TasksInterface } from '../models/tasks_interface';
import { MatTable, MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';


@Component({
  selector: 'app-pending-task',
  templateUrl: './pending-task.component.html',
  styleUrls: ['./pending-task.component.css']
})
export class PendingTaskComponent implements OnInit {  
  usersTasksData: TasksInterface[] = [];
  departmentsTasksData: TasksInterface[] = [];
  initiatedTasksData: TasksInterface[] = [];
  uninitiatedTasksData: TasksInterface[] = [];
  
  usersTasksColumns: string[] = ['requestId', 'SLA', 'workflowStage', 'requestedBy', 'bookName', 'workflowStatus',
  'bookType', 'sourceSystem'];
  
  departmentsTasksColumns: string[] = ['requestId', 'SLA', 'workflowStage', 'requestedBy', 'bookName', 'workflowStatus',
  'bookType', 'sourceSystem'];
  
  initiatedTasksColumns: string[] = ['requestId', 'SLA', 'workflowStage', 'requestedBy', 'bookName', 'workflowStatus',
  'bookType', 'sourceSystem'];
  
  uninitiatedTasksColumns: string[] = ['requestId', 'SLA', 'workflowStage', 'requestedBy', 'bookName', 'workflowStatus',
  'bookType', 'sourceSystem'];
  
  usersTasksDataSource = new MatTableDataSource<TasksInterface>(this.usersTasksData);
  departmentsTasksDataSource = new MatTableDataSource<TasksInterface>(this.departmentsTasksData);
  initiatedTasksDataSource = new MatTableDataSource<TasksInterface>(this.initiatedTasksData);
  uninitiatedTasksDataSource = new MatTableDataSource<TasksInterface>(this.uninitiatedTasksData);
  
  constructor(private service: PendingTasksService) {
    this.service.getUsersTasks().subscribe(
      data => {
        this.usersTasksData = data;
        this.usersTasksDataSource.data = this.usersTasksData; 
      });
      
      this.service.getDepartmentsTasks().subscribe(
        data => {
          this.departmentsTasksData = data;
          this.departmentsTasksDataSource.data = this.departmentsTasksData; 
        });
        
        this.service.getInitiatedTasks().subscribe(
          data => {
            this.initiatedTasksData = data;
            this.initiatedTasksDataSource.data = this.initiatedTasksData; 
          });
          
          this.service.getUninitiatedTasks().subscribe(
            data => {
              this.uninitiatedTasksData = data;
              this.uninitiatedTasksDataSource.data = this.uninitiatedTasksData; 
            });
          }
          
          ngOnInit() {
            
          }
          
        }
        