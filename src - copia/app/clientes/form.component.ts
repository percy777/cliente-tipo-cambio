import { Component, OnInit } from '@angular/core';
import { Clientes } from './clientes';
import { ClientesService } from './clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
  })
export class FormComponent implements OnInit {
  public cliente : Clientes = new Clientes();

  public titulo : String = "Formulario de Ingreso";

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

  ngOnInit() {
    this.cargarCliente();
    
  }

 

  public agregar(): void{
    console.log("se clikeo!!");
    console.log(this.cliente.nombre);

    this.clienteservice.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('nuevo cliente',`Cliente ${cliente.nombre} creado con exito!!`, 'success')
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
              (cliente) => this.cliente = cliente )

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
