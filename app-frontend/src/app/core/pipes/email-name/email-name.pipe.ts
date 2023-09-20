import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailName',
})
export class EmailNamePipe implements PipeTransform {
  transform(value: string): string {
    const name = !!value ? value.split('@')[0] : 'Unknown';
    return `By: ${name}`;
  }
}
