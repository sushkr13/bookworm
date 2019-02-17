import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AddTabMenuClickItemService } from '../shared/addtabmenuclickitem.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponent implements OnInit {
  temp: string;
  userName : string;
  ringFenceMarker : string;
  constructor(private router: Router, private route: ActivatedRoute, 
    private service: AddTabMenuClickItemService, private authService: AuthService) 
    {
      this.userName = authService.userName;
      this.ringFenceMarker = authService.ringFenceMarker + "  ";
     }

  ngOnInit() {
  }
  
  submit(event:any)
  {
    console.log("abc");
     this.service.addTabs(event.srcElement.textContent.toString().replace("assignment", ""), null);
  }

  logout()
  {
    this.router.navigate(['/login'], {relativeTo: this.route});
  }
}


