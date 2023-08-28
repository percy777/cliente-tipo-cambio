import { Injectable } from '@angular/core';
import { listaClientes } from './clientes.json';
import { Clientes } from './clientes';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class ClientesService {

  private http : HttpClient;
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(http: HttpClient) {
    this.http=http;
   }
  
  getcliente(): Observable<Clientes[]>{
    // // return of(listaClientes);
    // return this.http.get(this.urlEndPoint).pipe( 
    //   map( (response )=>response as Clientes[])
    //   );
    return this.http.get<Clientes[]>(this.urlEndPoint);
  }

  getclientexId(id: number) : Observable<Clientes>{
    return this.http.get<Clientes>(`${this.urlEndPoint}/${id}`);

  }

  create(cliente: Clientes): Observable<Clientes>{
    return this.http.post<Clientes>(this.urlEndPoint,cliente,{headers: this.httpHeaders});

  }

  update(cliente : Clientes) : Observable<Clientes>{
    return this.http.put<Clientes>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers: this.httpHeaders});

  } 

  delete(id: number) : Observable<Clientes>{
    return this.http.delete<Clientes>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders});

  }
}
