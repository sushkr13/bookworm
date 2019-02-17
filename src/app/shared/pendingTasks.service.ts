import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TasksInterface } from '../models/tasks_interface';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PendingTasksService {

  constructor(private httpClient: HttpClient) {
    
   }

   getUsersTasks(): Observable<TasksInterface[]> 
   {
     return this.httpClient.get<TasksInterface[]>
     ("http://localhost:4000/userstasks")
     .map(result => result.slice());
   }
 
   getDepartmentsTasks(): Observable<TasksInterface[]> 
   {
     return this.httpClient.get<TasksInterface[]>
     ("http://localhost:4000/departmentstasks")
     .map(result => result.slice());
   }
 
   getInitiatedTasks(): Observable<TasksInterface[]> 
   {
     return this.httpClient.get<TasksInterface[]>
     ("http://localhost:4000/initiatedtasks")
     .map(result => result.slice());
   }
 
   getUninitiatedTasks(): Observable<TasksInterface[]> 
   {
     return this.httpClient.get<TasksInterface[]>
     ("http://localhost:4000/uninitiatedtasks")
     .map(result => result.slice());
   }

  
}
