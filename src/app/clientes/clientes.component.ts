import { Component, OnInit } from '@angular/core';
import { Clientes } from './clientes';
import { ClientesService } from './clientes.service';
import Swal from 'sweetalert2';
import { Monedas } from './moneda';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  
})
export class ClientesComponent implements OnInit {

  losClientes: Clientes[];

  lasMonedas: Monedas[];

    constructor(private clienteService: ClientesService) {
      }
  ngOnInit()  {
    
 
  this.clienteService.getcliente().subscribe(
                        lasMonedas => this.lasMonedas = lasMonedas //funcion anonima
                        );

  }
 

  public borrar(moneda : Monedas){
   
    
    Swal.fire({
      title: 'Esta seguro?',
      text: "Se borrara el registro!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(moneda.id).subscribe(
          response => {
            this.lasMonedas = this.lasMonedas.filter(cli => cli != moneda)
            Swal.fire(
              'Borrado!',
              'el registro a sido borrado.',
              'success'
            )
          } );

      
      }
    })
   
    
  }
  
  
}
