import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { IntlRelativeTimePipe } from 'angular-ecmascript-intl';

@Pipe({
  name: 'customTime',
})
export class CustomTimePipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
    private agoPipe: IntlRelativeTimePipe,
  ) {}

  transform(value: Date): string {
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const timeDiffInMs = new Date().getTime() - new Date(value).getTime();
    const body =
      timeDiffInMs > sevenDaysInMs
        ? `POSTED ON ${this.datePipe.transform(value)}`
        : `${this.agoPipe.transform(value, {
            locale: 'en-US',
          })}`;
    return body;
  }
}
