import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-book-open',
  templateUrl: './book-open.component.html',
  styleUrls: ['./book-open.component.css']
})

export class BookOpenComponent implements OnInit, AfterViewInit {
  tabs = ['Book Details Stage 1'];
  selected= new FormControl(0);
  @Input() selectedTab : any;
  @Input() selectedTabs : any;  

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.selectedTab.setValue(this.selectedTabs.length - 1);
  }

  constructor() {
    
  }


}
