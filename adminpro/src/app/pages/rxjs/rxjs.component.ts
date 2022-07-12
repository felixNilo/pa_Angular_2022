import { Component } from '@angular/core';
import { Observable, retry, interval, take, map } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent {
  constructor() {
    /* this.retornaObservable()
      .pipe(retry(3))
      .subscribe({
        next: (valor) => console.log('Subs: ', valor),
        error: (error) => console.error('Error: ', error),
        complete: () => console.info('Obs complete'),
      }); */
    this.retornaIntervalo().subscribe((valor) => console.log(valor));
    //this.retornaIntervalo().subscribe(console.log);
  }

  retornaIntervalo() {
    const intervalo$ = interval(1000).pipe(
      take(4),
      map((valor) => {
        return valor + 1;
      })
    );
    return intervalo$;
  }

  retornaObservable(): Observable<number> {
    let i = 0;
    const obs$ = new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 5) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          console.log('llego a 2');
          i = 0;
          observer.error('i llego a 2');
          clearInterval(interval);
        }
      }, 1000);
    });
    return obs$;
  }
}
