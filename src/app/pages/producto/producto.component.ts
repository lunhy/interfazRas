import { Component, OnInit } from '@angular/core';
import { WsService } from '../../services/ws.service';
import { MatDialog,MatDialogConfig } from '@angular/material';
import Swal from 'sweetalert2';
import { AltaproductoComponent } from './altaproducto/altaproducto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  id_proceso;
  productoGuardado;
  listaProductos=[]; 

  constructor(private ws:WsService,private dialog: MatDialog) {
    this.id_proceso=localStorage.getItem('id_proceso');
  }

  ngOnInit() {
    this.ws.id_producto.subscribe(prod=>{
      if(prod!=null){
        this.listaProductos=[];
        this.listaProductos.push(prod);
      }
    });
    if(JSON.parse(localStorage.getItem('id_producto'))!=null){
      this.listaProductos=[];
      this.listaProductos.push(JSON.parse(localStorage.getItem('id_producto')));
    }
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
  
  altaProducto(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data={
      id_proceso:this.id_proceso
    }
    const dialogRefAlta=this.dialog.open(AltaproductoComponent,dialogConfig);

    dialogRefAlta.afterClosed().subscribe(result => {
      if(result!=null){
        console.log(result)
        localStorage.removeItem('id_producto');
        localStorage.setItem('id_producto',JSON.stringify(result));
        this.ws.producto.next(result);
        this.listaProductos=[];
        this.listaProductos.push(result);
      }
    });
  }

  bajaProducto(){
    
  }
}
