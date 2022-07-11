import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });

    /*const promesa = new Promise((resolve, reject) => {
      if (false) {
        //condicion que verifica que no hay error
        resolve('Hola Mundo');
      } else {
        reject('Algo salio mal');
      }
    });

    promesa
      .then(() => {
        console.log('Termino la promesa');
      })
      .catch((error) => console.log('error en mi promesa', error));

    console.log('fin del Init');*/
  }

  getUsuarios() {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users').then((res) =>
        console.log(res.json().then((data) => resolve(data.data)))
      );
    });

    return promesa;
  }
}
