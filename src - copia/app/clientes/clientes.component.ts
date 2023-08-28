import { Component, OnInit } from '@angular/core';
import { Clientes } from './clientes';
import { ClientesService } from './clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  
})
export class ClientesComponent implements OnInit {

  losClientes: Clientes[];
  /**
  private clienteService: ClientesService
  constructor(clienteService: ClientesService) {
    this.clienteService = clienteService
    }
 */
    constructor(private clienteService: ClientesService) {
      }
  ngOnInit()  {
    
  this.clienteService.getcliente().subscribe(
                          losClientes => this.losClientes = losClientes //funcion anonima
                        );
  }

  public borrar(cliente : Clientes){
   
    
    Swal.fire({
      title: 'Esta seguro?',
      text: "Se borrara el cliente!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.losClientes = this.losClientes.filter(cli => cli != cliente)
            Swal.fire(
              'Borrado!',
              'el cliente a sido borrado.',
              'success'
            )
          } );

      
      }
    })
    
    
  }
  
  
}
