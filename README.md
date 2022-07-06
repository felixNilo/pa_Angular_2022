# Programacion de aplicaciones 2022

## Ordenaremos nuestro app.routing

Si nos fijamos tenemos bastantes rutas, y podriamos tener mas. Por eso, empaquetaremos las rutas de pages.
Primero, crearemos un arhivo de rutas para nuestras paginas.

### Cree un archivo de nombre pages.routing.ts dentro de pages

Este archivo debe ser muy similar a la base de app.routing:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';s
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
```

### Importemos este pages.routing en nuestro app-routing

Para ello, simplemente, en nuestros imports del modulo debemos importar PagesRoutingModule.

## Realizaremos lo mismo pero para las rutas de auth.

De esta forma, creemos un archivo de rutas auth.routing.ts dentro de la carpeta auth. Este debe contener:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
```

### Finalmente, un recordatorio.

Dejemos documentadas las rutas en nuestro app.routing de manera de dejar claro como estan estructuradas las rutas de la aplicacion.
