import { Component } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent {
  constructor(private service: AuthService, 
    private router: Router, private route: ActivatedRoute ) { }
  
    message: string;


  onSubmit()
  {
    if (this.service.form.valid) 
    {
       const userId = this.service.form.value.userId;
       const password = this.service.form.value.password;
       const domain = this.service.form.value.domain;
       
       this.service.login(userId, password, domain)
        .subscribe(
        (resp) => 
        {
           if(resp.isAuthenticated==="true")
           {
              this.service.loggedIn=true;
              this.router.navigate(['/home'], {relativeTo: this.route});
              this.message = "";
              this.service.userName = resp.userName;
              this.service.ringFenceMarker = resp.ringFenceMarker;
           }
           else
           {
              this.service.loggedIn=false;
              console.error('Error logging in');
              this.message = "User Name or Password provided is incorrect";
           }           
        }, 
        (err) => 
        {
            console.error('Error logging in', err);
            this.service.loggedIn=false;
            this.message = "Error logging in";
        }
      );
     
    }
  }
  onClear()
  {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

}
