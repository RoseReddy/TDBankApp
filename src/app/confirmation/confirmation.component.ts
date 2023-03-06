import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { StoreValues } from '../store-values';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  myForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  formattedDate: string;
  information: StoreValues = {
    FirstName: '',
    LastName: '',
    DOB: '',
    PostalCode: '',
  };
  constructor(private router: Router, private sharedService: SharedService) {
    this.minDate = new Date(1823, 0, 1); // year, month (0-based), day
    this.maxDate = new Date(2005, 11, 31); // year, month (0-based), day
  }

  ngOnInit(): void {
    let p = 0;
    this.sharedService.getobjValues().subscribe((res: any) => {
      this.createFormControls();
      if (res != 123) {
        // this.isEdit=true;
        console.log(res);
        this.myForm.patchValue({
          FirstName: res.FirstName,
          LastName: res.LastName,
          DOB: this.sharedService.parseDate(
            res.DOB != null ? res.DOB : new Date()
          ),
          PostalCode: res.PostalCode,
        });
      } else {
      }
    });
  }

  stopEventPropagation(event: Event) {
    event.stopPropagation();
  }

  createFormControls() {
    this.myForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      DOB: new FormControl('', [Validators.required]),
      PostalCode: new FormControl('', [Validators.required]),
    });
  }
  onClickSubmit() {
    this.router.navigate(['/entry/thankyou']);
  }

  onClickBackButton($event: any) {
    this.information.FirstName = this.myForm.controls['FirstName'].value;
    this.information.LastName = this.myForm.controls['LastName'].value;
    this.information.DOB = this.sharedService.dateFormating(
      new Date(this.myForm.controls['DOB'].value)
    );
    this.information.PostalCode = this.myForm.controls['PostalCode'].value;
    this.sharedService.setobjValues(this.information);
    this.router.navigate(['/']);
  }
  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    
  }
}
