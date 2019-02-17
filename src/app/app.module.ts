import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyMaterialModule } from  './material.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login-component/login-component.component';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { HeaderComponent } from './header-component/header-component.component';
import { BookOpenComponent } from './book-open/book-open.component';
import { BookOpenStageOneComponent } from './book-open-stage-one/book-open-stage-one.component';
import { BookOpenStageTwoComponent } from './book-open-stage-two/book-open-stage-two.component';
import { BookOpenStageThreeComponent } from './book-open-stage-three/book-open-stage-three.component';
import { AddBookStageTwoComponent } from './add-book-stage-two/add-book-stage-two.component';
import { NotificationService } from './shared/notification.service';
import { InitialBookDetailsService } from './shared/initialBookDetails.service';
import { PendingTaskComponent } from './pending-task/pending-task.component';
import { GatewayComponent } from './gateway/gateway.component';
import { CostCentreSearchComponent } from './cost-centre-search/cost-centre-search.component';
import { CostCentreSearchService } from './shared/costCentreSearch.service';
import { PersonSearchComponent } from './person-search/person-search.component';
import { PersonSearchService } from './shared/personSearch.service';
import { GatewayService } from './shared/gateway.service';
import { AddTabMenuClickItemService } from './shared/addtabmenuclickitem.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PendingTasksService } from './shared/pendingTasks.service';
import { RequestSummaryComponent } from './request-summary/request-summary.component';
import { TaskApproversComponent } from './task-approvers/task-approvers.component';
import { FocusDirective} from './request-summary/request-summary.directive';
import { DialogService } from './shared/dialog.service';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    FocusDirective,
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    BookOpenComponent,
    PendingTaskComponent,
    BookOpenStageOneComponent,
    BookOpenStageTwoComponent,
    BookOpenStageThreeComponent,
    AddBookStageTwoComponent,
    PendingTaskComponent,
    GatewayComponent,
    CostCentreSearchComponent,
    PersonSearchComponent,
    RequestSummaryComponent,
    TaskApproversComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    ReactiveFormsModule, 
    FormsModule, 
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: GatewayComponent },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},      
      { path: 'bookopen', component: BookOpenComponent, canActivate: [AuthGuard], children: [
      { path: 'bookopenstageone', component: BookOpenStageOneComponent },
      { path: 'bookopenstagetwo', component: BookOpenStageTwoComponent },
      { path: 'bookopenstagethree', component: BookOpenStageThreeComponent } ] },    
      { path: 'requestsummary', component: RequestSummaryComponent , canActivate: [AuthGuard]},
    ]),
  ],
  providers: [AuthService, 
    NotificationService, 
    InitialBookDetailsService, 
    CostCentreSearchService,
    PersonSearchService,
    GatewayService,
    AddTabMenuClickItemService,
    PendingTasksService,
    AuthGuard,
    DialogService
  ],
  entryComponents: [
    AddBookStageTwoComponent,
    CostCentreSearchComponent,
    PersonSearchComponent,
    TaskApproversComponent,
    MatConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

