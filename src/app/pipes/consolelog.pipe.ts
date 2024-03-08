import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consolelog',
  standalone: true
})
export class ConsoleLogPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
		console.log(value); // eslint-disable-line no-console
    return null;
  }

}
