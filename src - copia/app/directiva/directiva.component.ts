import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  })
export class DirectivaComponent {

  listaCurso: string[] = ['java','c++','pyton','tyscript'];
  habilitar: boolean = true;
  boton: any = {btn1:'mostrar',btn2:'ocultar'}
  constructor() { }

  mostrarHabilitar():void{
    this.habilitar = (this.habilitar==true)?false:true;
  }


}
