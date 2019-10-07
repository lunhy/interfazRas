import { Component, OnInit } from '@angular/core';
import { WsService } from '../../services/ws.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  id_proceso;
  productoGuardado;
  listaProductos; 

  constructor(private ws:WsService) {
    this.id_proceso=localStorage.getItem('id_proceso');
  }

  ngOnInit() {
    this.getProductos(this.id_proceso);
    this.ws.id_producto.subscribe(prod=>{
      this.productoGuardado=prod;
    });
    this.productoGuardado=localStorage.getItem('id_producto');
  }

  getProductos(id){
    this.ws.getProductos(id).subscribe(prod=>{
      if(prod!=null){
        this.listaProductos=prod['data'];
      }
    });
  }

  selectProducto(producto){
    console.log(producto);
    if(producto.id_producto == this.productoGuardado){
      console.log("son iguales");
      this.ws.producto.next(null);
      this.ws.material.next(null);
      localStorage.setItem('id_producto',this.productoGuardado);
      localStorage.removeItem('id_material');

      this.productoGuardado=localStorage.removeItem('id_producto');

      Swal.fire({type:'success',title:'Cambio de Producto',timer:1000,showConfirmButton:false});
    }else{
      this.ws.producto.next(producto.id_producto);
      localStorage.setItem('id_producto',this.productoGuardado);
      localStorage.removeItem('id_material');
      this.ws.material.next(null);

      Swal.fire({type:'success',title:'Producto Seleccionado',timer:1000,showConfirmButton:false});
    }
  }
}
