import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WsService } from '../../../services/ws.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-altaproducto',
  templateUrl: './altaproducto.component.html',
  styleUrls: ['./altaproducto.component.css']
})
export class AltaproductoComponent implements OnInit {
  id_proceso:any;
  listaProductos=[];
  selectedIndex=-1;
  producto;
  constructor(private ws:WsService,
              public dialogRefAltaP: MatDialogRef<AltaproductoComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
                this.id_proceso=data.id_proceso; 
  }

  ngOnInit() {
    this.getProductos(this.id_proceso);
  }

  getProductos(id){
    this.ws.getProductos(id).subscribe(prod=>{
      console.log(prod);
      if(prod!=null){
        this.listaProductos=prod['data'];
        if(localStorage.getItem('id_producto')!=null){
          var auxProductos=[];

          for(let i=0; i<this.listaProductos.length; i++){
            if(this.listaProductos[i].id_producto!=localStorage.getItem('id_producto')){
              auxProductos.push(this.listaProductos[i]);
            }
          }
          this.listaProductos=auxProductos;
        }
      }
    });
  }
  selectProducto(producto){
    this.selectedIndex=producto.id_producto;
    this.producto=producto;
    Swal.fire({type:'success',title:'Producto Seleccionado',timer:1000,showConfirmButton:false});
  }
  close(): void {
    this.dialogRefAltaP.close();
  }
  
}
