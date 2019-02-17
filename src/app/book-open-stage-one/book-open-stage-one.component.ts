import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { InitialBookDetailsService } from '../shared/initialBookDetails.service';
import { InitialBookDetails } from '../models/initial-book-details';
import { Router, ActivatedRoute } from '@angular/router';
import { AddTabMenuClickItemService } from '../shared/addtabmenuclickitem.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-book-open-stage-one',
  templateUrl: './book-open-stage-one.component.html',
  styleUrls: ['./book-open-stage-one.component.css']
})
export class BookOpenStageOneComponent implements OnInit {
  form: FormGroup;
  bookOpeningTypes: any; 
  @Input() childTabs: any;
  @Input() selected: any;
  constructor(fb: FormBuilder, private service: InitialBookDetailsService,
    private router: Router, private route: ActivatedRoute, private notificationService: NotificationService,
    private tabAddService: AddTabMenuClickItemService) {

    this.service.getBookOpeningType().subscribe(
      data => {
        this.bookOpeningTypes = data;
      });
  }
  ngOnInit() {
  }

  onSubmit()
  {

    if (this.service.stageOneForm.valid) 
    {
      console.log(this.service.stageOneForm.value.bookOpeningType);
      console.log(this.service.stageOneForm.value.riskBook);
      this.service.submitInitialBookDetails(this.service.stageOneForm.value.bookOpeningType, 
        this.service.stageOneForm.value.riskBook);      
      this.notificationService.success('Submitted successfully');  
      this.tabAddService.addTabs('Book Details Stage 2',this.childTabs); 
      this.selected.setValue(this.childTabs.length - 1);
    }
  }

  onClear()
  {
    this.service.stageOneForm.reset();
    this.service.stageOneForm.value.bookOpeningType="";
    this.service.stageOneForm.value.riskBook="";
  }


}
