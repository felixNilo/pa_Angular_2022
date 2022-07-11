# Programacion de aplicaciones 2022

## Crearemos el servicio sidebar

Este se ocupara de manejar las redirecciones que vendran desde el backend.
Al igual que en los casos anteriores, debemos ingresar por consola:
`ng g s services/sidebar --skip-tests`

La idea es que desde este servicio, poblemos nuestros enlaces disponibles, entonces, creemos en el servicio los enlaces que tenemos disponibles en nuestra aplicacion.

```
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge', //viene de la plantilla sidebar
      submenu: [
        {
          titulo: 'Main',
          url: '/' /*reemplaza al dashboard que estaba originalmente*/,
        },
        { titulo: 'Progressbar', url: 'progress' },
        { titulo: 'Grafica', url: 'grafica1' },
      ],
    },
  ];
  constructor() {}
}
```

### como utilizar el servicio que acabamos de crear?

Al momento de inicializar el componente sidebar, debemos llamar al servicio.

```
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private sidebarService: SidebarService) {
    this.menuItems = sidebarService.menu;
    console.log(this.menuItems);
  }

  ngOnInit(): void {}
}
```

Ahora, cuando el componente sidebar se inicializa, se imprime por consola los elementos del menu.

## Imprimamos el menu en la plantilla

Solo nos queda recorrer este arreglo en nuestra plantilla, para ello utilizaremos el metodo **_ngFor_**.

```
<li class="nav-small-cap">PERSONAL</li>
        <li *ngFor="let item of menuItems">
          <a
            class="has-arrow waves-effect waves-dark"
            href="#"
            aria-expanded="false"
            ><i class="mdi mdi-gauge"></i
            ><span class="hide-menu">
              {{ item.titulo }}
              <span class="label label-rouded label-themecolor pull-right">{{
                item.submenu.length
              }}</span></span
            ></a
          >
          <ul aria-expanded="false" class="collapse">
            <li *ngFor="let subMenuItem of item.submenu">
              <a [routerLink]="subMenuItem.url">{{ subMenuItem.titulo }}</a>
            </li>
          </ul>
        </li>
```

Es importante destacar que ahora el atributo routerLink esta en llaves cuadradas, esto es porque estamos asignando un valor de una llave al elemento routerlink en vez de asignarle directamente un String.
