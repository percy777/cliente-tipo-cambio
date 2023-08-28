import { Component, OnInit } from '@angular/core';
import { Clientes } from './clientes';
import { ClientesService } from './clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Monedas } from './moneda';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
  })
export class FormComponent implements OnInit {
  public cliente : Clientes = new Clientes();
  public moneda : Monedas = new Monedas();

   listaMonedaOrigen: string[] = ['Soles'];
   listaMonedadestino: string[] = ['Dolares','Euros','Yenes','Soles'];

  public titulo : String = "Formulario Tipo de Cambio";

  private clienteservice : ClientesService;

  private router : Router;

  private activateRouter : ActivatedRoute;

  public habilitar: boolean = true;
  public boton: any = {btn1:'Agregar',btn2:'Actualizar'}

  constructor(clienteservice : ClientesService, router : Router, activateRouter : ActivatedRoute) {
      this.clienteservice = clienteservice;
      this.router = router;
      this.activateRouter = activateRouter;

   }


   cambioMoneOrige(e){
    console.log(e.target.value);
    this.moneda.monedaOrigen = e.target.value;
    }
    cambioMoneDest(e){
      console.log(e.target.value);
      this.moneda.monedaDestino = e.target.value;
    }
  ngOnInit() {
    this.cargarCliente();
    
  }

 

  public agregar(): void{
  
    console.log("se clikeo!!");
    console.log(this.moneda.monto);
    console.log(this.moneda.monedaOrigen);
    console.log(this.moneda.monedaDestino);

    this.clienteservice.create(this.moneda).subscribe(
      moneda => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nueva Consulta',`Consulta realizada con exito!!`, 'success')
       }
    );

  }

  public cargarCliente(): void{ 
    
    console.log(this.habilitar);
    this.activateRouter.params.subscribe(
        params => {
          let id = params['id']
          if(id){
            this.clienteservice.getclientexId(id).subscribe(
              (moneda) => this.moneda = moneda )

          }
        }

    )
  }



  public actualizar():void{
    this.clienteservice.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente Actualizado',`Cliente ${cliente.nombre} actualizado con exito!!`, 'success')
       }
    );
  }




}
