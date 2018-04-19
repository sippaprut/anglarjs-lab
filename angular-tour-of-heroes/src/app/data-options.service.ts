import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface DateOption  {
  name: string;
  label?: string;
  hasDateFrom: boolean;
  hasDateTo: boolean;
  start?: any;
  end?: any;
}

@Injectable()
export class DataOptionsService {

  date: DateOption[];

  private _timeZone = 'en-US';

  get timeZone(): string {
    return this._timeZone;
  }

  set timeZone(timezone: string) {
    this._timeZone = timezone;
  }

  constructor( private datePipe: DatePipe ) {
    const today = new Date();
    const optionsHours = {
      hour12: false
    };

    this.date = [
      {
        name: 'Today',
        hasDateFrom: false,
        hasDateTo: false,
        start: this.datePipe.transform(today, 'yyyy-MM-d'),
        end: ''
      },
      {
        name: 'All time',
        hasDateFrom: false,
        hasDateTo: false,
        start: '',
        end: this.datePipe.transform(today, 'yyyy-MM-d')
      },
      {
        name: 'Past week',
        hasDateFrom: false,
        hasDateTo: false,
        start: this.datePipe.transform(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 7
          )
        )
        ,
        end: this.datePipe.transform(today, 'yyyy-MM-d')
      },
      {
        name: 'Specific date',
        hasDateFrom: true,
        hasDateTo: false,
        start: '',
        end: ''
      },
      {
        name: 'Past month',
        hasDateFrom: false,
        hasDateTo: false,
        start: this.datePipe.transform(
          new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate()
          )
        ),
        end: this.datePipe.transform(today, 'yyyy-MM-d')
      },
      {
        name: 'Date range',
        hasDateFrom: true,
        hasDateTo: true,
        start: '',
        end: ''
      },
      {
        name: 'Past Year',
        hasDateFrom: false,
        hasDateTo: false,
        start: this.datePipe.transform(
          new Date(
            today.getFullYear() - 1,
            today.getMonth(),
            today.getDate()
          )
        ),
        end: this.datePipe.transform(today, 'yyyy-MM-d')
      }
    ];
  }

  getDates(): DateOption[] {
    return this.date;
  }

}
