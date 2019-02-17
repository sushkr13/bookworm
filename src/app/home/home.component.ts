import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HeaderComponent } from '../header-component/header-component.component';
import { AddTabMenuClickItemService } from '../shared/addtabmenuclickitem.service';
import { matTabsAnimations, MatTabsModule, MatTabChangeEvent } from '@angular/material';
 
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  tabs = [];
  //tabs = ['Pending Task List'];
  selected = new FormControl(0);
  @ViewChild(HeaderComponent) childComponent: HeaderComponent;

    
  constructor(private router: Router, private service: AddTabMenuClickItemService) 
  {
    this.tabs = this.service.tabs;
  }

  ngOnInit() {  
    
    //this.tabs.push(this.childComponent.menuName); 
  }

  onClose(index, event): void {
    console.log("closed");
    // //var index = this.tabs.indexOf(tab);
    // console.log(event);
    // console.log(event.index);
    // console.log(index);
    if (index > -1) {
      this.tabs.splice(index, 1);
    }
    //console.log(this.tabs);
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
   console.log('tabChangeEvent => ', tabChangeEvent);
    // console.log('index => ', tabChangeEvent.index);
  }
  
}



