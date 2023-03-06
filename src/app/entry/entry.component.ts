import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';

import { SharedService } from '../shared.service';
import { StoreValues } from '../store-values';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  myForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  isSubmittedValue: boolean = false;
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
    this.sharedService.getobjValues().subscribe((res: any) => {
      this.createFormControls();

      if (res != 123) {
        console.log(res);
        this.myForm.patchValue({
          FirstName: res.FirstName,
          LastName: res.LastName,
          DOB: this.sharedService.parseDate(
            res.DOB != null ? res.DOB : new Date()
          ),
          PostalCode: res.PostalCode,
        });
        if (this.myForm.status == 'VALID') {
          this.isSubmittedValue = false;
        } else {
          // Disable the submit button here
          this.isSubmittedValue = true;
        }
      } else {
      }
    });
  }

  canadianPostalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const postalCode = control.value;
      const postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

      if (postalCode && !postalCodePattern.test(postalCode)) {
        return { invalidCanadianPostalCode: { value: postalCode } };
      }

      return null;
    };
  }
  createFormControls() {
    this.myForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      DOB: new FormControl('', [Validators.required]),
      PostalCode: new FormControl('', [
        Validators.required,
        this.canadianPostalCodeValidator(),
      ]),
    });
  }

  onClickSubmit() {
    let p=0;
    this.router.navigate(['/thankyou']);
  }

  onClickBackButton($event: any) {}
  onDateSelected(event: MatDatepickerInputEvent<Date>) {}

  onSubmitForm($event: FormGroup) {
    if (this.myForm.valid) {
      this.information.FirstName = this.myForm.controls['FirstName'].value;
      this.information.LastName = this.myForm.controls['LastName'].value;
      this.information.DOB = this.sharedService.dateFormating(
        new Date(this.myForm.controls['DOB'].value)
      );
      this.information.PostalCode = this.myForm.controls['PostalCode'].value;
      this.sharedService.setobjValues(this.information);
      this.router.navigate(['/Confirmation']);
    }
  }
}
