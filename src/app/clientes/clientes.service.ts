import { Injectable } from '@angular/core';
import { Clientes } from './clientes';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Monedas } from './moneda';


@Injectable()
export class ClientesService {

  private http : HttpClient;
  private urlEndPoint: string = 'http://localhost:8080/api/tipoCambio';
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(http: HttpClient) {
    this.http=http;
   }
  
 

  getcliente(): Observable<Monedas[]>{
  
    return this.http.get<Monedas[]>(this.urlEndPoint);
  }

  getclientexId(id: number) : Observable<Monedas>{
    return this.http.get<Monedas>(`${this.urlEndPoint}/${id}`);

  }

  create(moneda: Monedas): Observable<Monedas>{
    return this.http.post<Monedas>(this.urlEndPoint,moneda,{headers: this.httpHeaders});

  }

  update(cliente : Clientes) : Observable<Clientes>{
    return this.http.put<Clientes>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers: this.httpHeaders});

  } 

    delete(id: number) : Observable<Monedas>{
    return this.http.delete<Monedas>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders});

  }
}
