# Programacion de aplicaciones 2022

## Trabajaremos con graficas en angular.

Primero vamos a la url https://www.npmjs.com/package/ng2-charts
Podemos ver que esta libreria publica nos da herramientas para generar graficos en componentes angular.

### Instalemos la libreria.

Para ello debemos ingresar por consola `npm install --save ng2-charts`  
Esta libreria hacer uso de la libreria chart.js asi es que tambien debemos instalar dicha libreria mediante `npm install --save chart.js`

De hecho, esto se indica en la url que se ha mencionado mas arriba y ademas, nos muestra ejemplos y demostraciones para usar la libreria en el link https://valor-software.com/ng2-charts/

### Importemos el modulo NgChart.

Debemos tener claro que solo utilizaremos este modulo en pages, asi es que lo importaremos en dicho modulo.

```
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    //AppRoutingModule,
    SharedModule,
    ComponentsModule,
    NgChartsModule,
  ]
```

### Creemos una grafica de dona en nuestra plantilla del componente grafica1.

Tal como en el incrementador, creemos un espacio para situar nuestra grafica.

```
<div class="row">
  <div class="col-6">
    <div class="card">
      <div class="card-body">Aqui va mi grafica</div>
    </div>
  </div>
</div>

```

Ahora, sigamos la pagina de demostracion para insertar el grafico de dona.
El elemento html posee:

```
    <div style="display: block">
      <canvas baseChart
        [data]="doughnutChartData"

        [type]="doughnutChartType">
      </canvas>
    </div>
```

Mientras que el controlador entrega la data quedando asi:

```
import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{

  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
      { data: [ 50, 150, 120 ] },
      { data: [ 250, 130, 70 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}

```

**_Si, hemos sacado el OnInit ya que aun no lo vamos a utilizar._**

En este punto ya deberiamos poder ver el grafico de dona.

Agregemos un header a nuestra grafica `<h3>Sales</h3>`

### Cambiemos los colores de la grafica.

Para ello, debemos crear un arreglo de color dentro de nuestra data. Aprovechemos de simplificar nuestro grafico de manera de comprender mejor como funciona el elemento html.

```
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: ['#1D0FC5', '#EF0000', '#24C102'],
        hoverOffset: 4,
      },
    ],
  };
```

Como ven, hemos cambiado los datos de nuestra grafica, y los colores asociados a los datos.
Podriamos tambien cambiar los colores que aparecen al hacer hover con el mouse agregando:
`hoverBackgroundColor: ['#4B41C2', '#EE3333', '#57BB46'],`. Esas configuraciones como muchas otras, se encuentran documentadas en https://www.chartjs.org/docs/latest/charts/doughnut.html
