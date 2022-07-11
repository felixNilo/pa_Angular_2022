import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent {
  @Input() title: string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: string[] = [
    'Label1',
    'Label2',
    'Label3',
  ];

  @Input('data') doughnutChartDataNumbers: number[] = [300, 50, 100];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        label: 'My First Dataset',
        data: this.doughnutChartDataNumbers,
        //backgroundColor: ['#1D0FC5', '#EF0000', '#24C102'],
        //hoverBackgroundColor: ['#4B41C2', '#EE3333', '#57BB46'],
        hoverOffset: 1,
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
}
