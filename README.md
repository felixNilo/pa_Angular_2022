# Programacion de aplicaciones 2022

## Repeat to learn

Repitamos el procedimiento que hemos hecho con el componente incrementador. Es decir, creemos el componente de la grafica de dona de manera que este sea reutilizable.
Para ello primero debemos crear el componente dentro de la carpeta components `ng g c components/dona --skip-tests --inline-style`.
Luego, debemos extraer desde nuestra plantilla de grafica1 los elementos que queremos modularizar y situarlos en la plantilla del componente dona:

```
    <div class="card">
      <div class="card-body">
        <h3>Sales</h3>
        <div style="display: block">
          <canvas
            baseChart
            [data]="doughnutChartData"
            [type]="doughnutChartType"
          >
          </canvas>
        </div>
      </div>
    </div>
```

Tambien debemos migrar los elementos del controlador:

```
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: ['#1D0FC5', '#EF0000', '#24C102'],
        hoverBackgroundColor: ['#4B41C2', '#EE3333', '#57BB46'],
        hoverOffset: 1,
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
```

Recuerde que:

1. grafica1 estaba usando el modulo NgCharts dentro de pages, ahora queremos que este modulo se use en components, asi es que, en vez de importar el modulo NgChar en pages, lo importamos esta vez en el modulo components
2. Debemos exportar el componente desde el modulo de componentes para que el componente dona pueda ser usado desde otro componente.

### Comuniquemos el componente dona con el padre.

Recuerden que si queremos enviar datos desde el padre al hijo, debemos utilizar @Input. Entonces, creemos la variable Input title para configurar el titulo de la grafica.

`@Input() title: string = 'Sin titulo';`

Con esto en el controlador, desde nuestro llamado del componente, podriamos entregar el valor del titulo: ` <app-dona title="Mi grafico"> </app-dona>` e usar este valor en la plantilla del componente: `<h3>{{ title }}</h3>`
