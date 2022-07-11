import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public label1: string[] = ['pan', 'otro', 'queso'];
  public data1: number[] = [500, 600, 1000];
}
