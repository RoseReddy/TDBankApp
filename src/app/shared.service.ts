import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoreValues } from './store-values';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  formattedDate: string;
  objValues$ = new BehaviorSubject<any>(123);
  constructor() {}

  getobjValues() {
    return this.objValues$.asObservable();
  }
  setobjValues(data: StoreValues) {
    this.objValues$.next(data);
  }

  dateFormating($event: Date): string {
    const dateVal = $event;
    const month = dateVal.getMonth(); // getMonth() returns a zero-based index
    const day = dateVal.getDate();
    const year = dateVal.getFullYear();

    this.formattedDate = `${month.toString().padStart(2, '0')}/${day
      .toString()
      .padStart(2, '0')}/${year}`;
    return this.formattedDate;
  }
  parseDate(value: string): Date {
    const dateParts = value.trim().split('/');
    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[0], 10);
    const day = parseInt(dateParts[1], 10);
    return new Date(year, month, day);
  }
}
