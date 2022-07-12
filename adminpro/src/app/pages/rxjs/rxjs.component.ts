import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent {
  constructor() {
    const obs$ = new Observable((observer) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego a 2');
        }
      }, 1000);
    });

    obs$.subscribe({
      next: (valor) => console.log('Subs: ', valor),
      error: (error) => console.error('Error: ', error),
      complete: () => console.info('Obs complete'),
    });
  }
}
