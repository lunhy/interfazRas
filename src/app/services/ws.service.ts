import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  operador=new BehaviorSubject(null);
  id_operador:Observable<any>;
  proceso=new BehaviorSubject(null);
  id_proceso:Observable<any>;
  producto=new BehaviorSubject(null);
  id_producto:Observable<any>;
  material= new BehaviorSubject(null);
  id_materiales:Observable<any>
  constructor(private http:HttpClient) {
    this.id_operador=this.operador.asObservable();
    this.id_proceso=this.proceso.asObservable();
    this.id_producto=this.producto.asObservable();
    this.id_materiales=this.material.asObservable();
   }

  getUsers(id){
    let url= `http://192.168.2.107:3000/operadores/${id}`;
    return this.http.get(url);
  }
  getProcesos(){
    let url="http://192.168.2.107:3000/procesos";
    return this.http.get(url);
  }

  getProductos(id){
    let url=`http://192.168.2.107:3000/productos/${id}`;
    return this.http.get(url);
  }

  getMateriales(producto,proceso){
    let url=`http://192.168.2.107:3000/materiales/${producto}/${proceso}`;
    return this.http.get(url);
  }
}
