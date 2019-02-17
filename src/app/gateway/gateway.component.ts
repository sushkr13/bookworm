import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GatewayService } from '../shared/gateway.service';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css']
})
export class GatewayComponent {
  sourceSystemSelect:boolean=false;
  constructor(private router: Router, private route: ActivatedRoute, private service: GatewayService ) { }  

  onSubmit()
  {
    this.router.navigate(['/login'], {relativeTo: this.route});
  }
  onClear()
  {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  onNext()
  {
    if(this.service.form.value.sourceSystem!='' && this.service.form.value.activity!='')
    {
      this.sourceSystemSelect=true;
    }
  }

}

