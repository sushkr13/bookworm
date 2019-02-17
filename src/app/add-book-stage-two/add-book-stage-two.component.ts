import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { InitialBookDetailsService } from '../shared/initialBookDetails.service';

@Component({
  selector: 'app-add-book-stage-two',
  templateUrl: './add-book-stage-two.component.html',
  styleUrls: ['./add-book-stage-two.component.css']
})
export class AddBookStageTwoComponent implements OnInit {

  bookDetails: any;
  title: string;

  constructor(private service: InitialBookDetailsService,
    public dialogRef: MatDialogRef<AddBookStageTwoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if(data.editMode === false)
      {
        this.title = "New Book Details";
       if(data.index === 0)
       {
          this.form.setValue
          ({ isPrimary: true,
            isNewLedger: false,
            bookName: '',
            sourceSystem: '',
            sourceSystemLocation: '',
            valuationAdjustmentBookType: '',
            bookClassification: '',    
            glPostingStatus: '',
            walkerPostingIndicator: false,
            walkerPostingSource: '',
            crFeed: false,
            mrFeed: false,
            confirmationFlag: false,
            settlementFlag: '' });
       }
       else
       {
          this.form.setValue
          ({ isPrimary: false,
            isNewLedger: false,
            bookName: '',
            sourceSystem: '',
            sourceSystemLocation: '',
            valuationAdjustmentBookType: '',
            bookClassification: '',    
            glPostingStatus: '',
            walkerPostingIndicator: false,
            walkerPostingSource: '',
            crFeed: false,
            mrFeed: false,
            confirmationFlag: false,
            settlementFlag: '' });
       }
      }
      else
      {
         this.title = "Edit Book Details";   
         this.form.setValue({
          isPrimary: this.data.selectedData[data.index].isPrimary,
          isNewLedger: this.data.selectedData[data.index].isNewLedger,
          bookName: this.data.selectedData[data.index].bookName,
          sourceSystem: this.data.selectedData[data.index].sourceSystem,
          sourceSystemLocation: this.data.selectedData[data.index].sourceSystemLocation,
          valuationAdjustmentBookType: this.data.selectedData[data.index].valuationAdjustmentBookType,
          bookClassification: this.data.selectedData[data.index].bookClassification,    
          glPostingStatus: this.data.selectedData[data.index].glPostingStatus,
          walkerPostingIndicator: this.data.selectedData[data.index].walkerPostingIndicator,
          walkerPostingSource: this.data.selectedData[data.index].walkerPostingSource,
          crFeed: this.data.selectedData[data.index].crFeed,
          mrFeed: this.data.selectedData[data.index].mrFeed,
          confirmationFlag: this.data.selectedData[data.index].confirmationFlag,
          settlementFlag: this.data.selectedData[data.index].settlementFlag
        });
      }
     }
  
    form: FormGroup = new FormGroup({
      isPrimary: new FormControl(false),
      isNewLedger: new FormControl(false),
      bookName: new FormControl('', [Validators.required, Validators.maxLength(13)]),
      sourceSystem: new FormControl('', Validators.required),
      sourceSystemLocation: new FormControl('', Validators.required),
      valuationAdjustmentBookType: new FormControl('', Validators.required),
      bookClassification: new FormControl('', Validators.required),    
      glPostingStatus: new FormControl('', Validators.required),
      walkerPostingIndicator: new FormControl(false),
      walkerPostingSource: new FormControl('', Validators.required),
      crFeed: new FormControl(false),
      mrFeed: new FormControl(false),
      confirmationFlag: new FormControl(false),
      settlementFlag: new FormControl('')
    });

  ngOnInit() {
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    this.form.setValue({
      isPrimary: false,
      isNewLedger: false,
      bookName: '',
      sourceSystem: '',
      sourceSystemLocation: '',
      valuationAdjustmentBookType: '',
      bookClassification: '',    
      glPostingStatus: '',
      walkerPostingIndicator: false,
      walkerPostingSource: '',
      crFeed: false,
      mrFeed: false,
      confirmationFlag: false,
      settlementFlag: ''
    });
  }


  onSubmit() {
    this.service.bookDetailsStageTwo=
      {
         id:this.data.index,
         isPrimary: this.form.controls['isPrimary'].value,
         isNewLedger: this.form.controls['isNewLedger'].value,
         bookName: this.form.controls['bookName'].value,
         sourceSystem: this.form.controls['sourceSystem'].value,
         sourceSystemLocation: this.form.controls['sourceSystemLocation'].value,
         valuationAdjustmentBookType: this.form.controls['valuationAdjustmentBookType'].value,
         bookClassification: this.form.controls['bookClassification'].value,    
         glPostingStatus: this.form.controls['glPostingStatus'].value,
         walkerPostingIndicator: this.form.controls['walkerPostingIndicator'].value,
         walkerPostingSource: this.form.controls['walkerPostingSource'].value,
         crFeed: this.form.controls['crFeed'].value,
         mrFeed: this.form.controls['mrFeed'].value,
         confirmationFlag: this.form.controls['confirmationFlag'].value,
         settlementFlag: this.form.controls['settlementFlag'].value
      };
      this.dialogRef.close(this.service.bookDetailsStageTwo);
  }

  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();          
  }
}

