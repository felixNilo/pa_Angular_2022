# Programacion de aplicaciones 2022

## El observable del breadcrumbs sigue vivo!

Recuerdan cuando vimos que los observables se mantienen vivos mientras estemos en la aplicacion y no apliques la funcion unsubscribe?  
Es importante que hagamos unsubscribe en algun momento de nuestras suscripciones a observables ya que, si no lo hacemos, podriamos tener multiples suscriptores lo que se traduciria en problemas con la memoria.

### Repeat to learn

Para aplicar la funcion unsubscribe, nuestro suscriptor debe estar instanciado por una variable de tipo Subscription, de manera que, desde esta variable, apliquemos la funcion unsubscribe.

```
public tituloSubs: Subscription | undefined;

  constructor(private router: Router) {
    this.tituloSubs = this.getArgumentosRuta().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
    });
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
```

Ahora, implementemos la funcion ngOnDestroy.

```
export class BreadcrumbsComponent implements OnDestroy {
  ...
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}

```

Dentro de esta funcion, usaremos a nuestro suscriptor para instanciar la funcion `unsubscribe()`

```
ngOnDestroy(): void {
    this.tituloSubs?.unsubscribe();
  }
```

Utilizamos el identificador `?` debido a que la variable tituloSubs puede no estar definida, por ende, solo se aplicara la funcion unsubscribe mientras tituloSubs se encuentre definida.
