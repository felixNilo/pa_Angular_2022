import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo: string | undefined;
  public tituloSubs: Subscription | undefined;

  constructor(private router: Router) {
    this.tituloSubs = this.getArgumentosRuta().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
    });
  }
  ngOnDestroy(): void {
    this.tituloSubs?.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter(
        (event): event is ActivationEnd =>
          event instanceof ActivationEnd && event.snapshot.firstChild === null
      ),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
