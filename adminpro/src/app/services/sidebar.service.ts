import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
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
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: 'rxjs' },
      ],
    },
  ];
  constructor() {}
}
