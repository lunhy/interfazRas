import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WsService } from '../../services/ws.service';
import { SocketService } from '../../services/socket.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  operador:any;
  proceso:any;
  material:any;
  producto:any;
  alert:'';
  constructor(private router:Router,private ws:WsService,private socket:SocketService) { 
    this.ws.id_operador.subscribe(ope=>{
      this.operador=ope;
    });
    this.ws.id_proceso.subscribe(proc=>{
      this.proceso=proc;
    });
    this.ws.id_producto.subscribe(prod=>{
      this.producto=prod;
    });
    this.ws.id_materiales.subscribe(mat=>{
      this.material=mat;
    });
    
  }

  ngOnInit() {
    this.operador=localStorage.getItem('id_operador');
    this.proceso=localStorage.getItem('id_proceso');
    this.producto=localStorage.getItem('id_producto');
    this.material=localStorage.getItem('id_material');
    if(this.operador==null && this.producto==null && this.material==null){
      this.socket.verde(0);
      this.socket.azul(0);
      this.socket.alerta(0);
      this.socket.amarillo(1);
    }else if(this.producto==null && this.material==null){
      this.socket.amarillo(0);
      this.socket.azul(0);
      this.socket.alerta(0);
      this.socket.verde(1);
    }else if(this.material==null){
      this.socket.amarillo(0);
      this.socket.verde(0);
      this.socket.alerta(0);
      this.socket.azul(1);
    }else{
      this.socket.amarillo(0);
      this.socket.verde(0);
      this.socket.azul(0);
      this.socket.alerta(1);

    }
    console.log(JSON.parse(localStorage.getItem('id_materiales')));
    console.log("datos seleccionados");
    console.log("Proceso: ",this.proceso," Operador: ",this.operador," Producto: ",this.producto," Material: ",this.material);
  }

  selectMaterial(){
    if(this.proceso==null && this.operador==null && this.producto==null){
      Swal.fire({type:'error',title:'Falta Proceso, Operador y Producto',timer:1500,showConfirmButton:false});
    }else if(this.proceso==null && this.operador!=null && this.producto==null){
      Swal.fire({type:'error',title:'Falta Proceso y Producto',timer:1500,showConfirmButton:false});
    }else if(this.proceso!=null && this.operador==null && this.producto==null){
      Swal.fire({type:'error',title:'Falta Operador y Producto',timer:1500,showConfirmButton:false});
    }else if(this.proceso!=null && this.operador!=null && this.producto==null){
      Swal.fire({type:'error',title:'Falta Producto',timer:1500,showConfirmButton:false});
    }else{
      this.router.navigateByUrl('material');
    }
  }

  selectOperador(){
    if(this.proceso==null){
      Swal.fire({type:'error',title:'Falta Proceso',timer:1500,showConfirmButton:false});
    }else{
      this.router.navigateByUrl('operador');
    }
    // this.ws.proceso.next("troquelado");
    // localStorage.setItem('proceso',this.proceso);
  }

  selectProceso(){
    this.router.navigate(['proceso']);
  }

  selectCalidad(){ 
    console.log("cuarto elemento");
  }

  selectProducto(){ 
    console.log("quinto elemento");
    if(this.proceso==null && this.operador==null){
      Swal.fire({type:'error',title:'Falta Proceso y Operador',timer:1500,showConfirmButton:false});
    }else if(this.proceso==null && this.operador!=null){
      Swal.fire({type:'error',title:'Falta Proceso',timer:1500,showConfirmButton:false});
    }else if(this.proceso!=null && this.operador==null){
      Swal.fire({type:'error',title:'Falta Operador',timer:1500,showConfirmButton:false});
    }else{
      this.router.navigate(['producto']);

    }
  }
    
  selectBitacora(){
    console.log("sexto elemento");
  }

  selectSGC(){

  }
  salir(){
    localStorage.clear();
    this.ws.operador.next(null);
    this.ws.proceso.next(null);
    this.socket.azul(0);
    this.socket.amarillo(0);
    this.socket.verde(0);
    this.socket.alerta(0);
  }

}
