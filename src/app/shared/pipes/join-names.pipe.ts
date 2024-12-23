import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'joinNames'
})
export class JoinNamesPipe implements PipeTransform {

  transform(value: any[], property: string): string {
    if (!value || !Array.isArray(value)) {
      return '';
    }

    return value.map(item => item[property]).join(', ');
  }

}
