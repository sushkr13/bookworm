import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    sourceSystem: new FormControl(''),
    activity: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      sourceSystem: new FormControl(''),
      activity: new FormControl('')
    });
  }
}
