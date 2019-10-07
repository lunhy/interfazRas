import { Component, OnInit } from '@angular/core';
import { WsService } from '../../services/ws.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {
  procesoSeleccionado;
  procesoGuardado; 
  listaProcesos=[];

  constructor(private ws:WsService) {
  }
  
  ngOnInit() {
    this.getProcesos();
    this.procesoGuardado=localStorage.getItem('id_proceso');
  }
  getProcesos(){
    this.ws.getProcesos().subscribe(procesos=>{
      console.log(procesos);
      if(procesos!=null){
        this.listaProcesos=procesos['data'];
      }
    });
   
  }
  selectProceso(proceso){
    console.log("procesos seleccionado",proceso);
    if(this.procesoGuardado!=proceso.id_proceso){
      console.log("Cambio de proceso");
      this.procesoGuardado=proceso.id_proceso;
      this.ws.proceso.next(proceso.id_proceso);
      localStorage.setItem('id_proceso',proceso.id_proceso);
      localStorage.removeItem('id_operador');
      localStorage.removeItem('id_producto');
      localStorage.removeItem('id_material');
    }else{
      //guardamos el nuevo proceso
      this.ws.proceso.next(proceso.id_proceso);
      localStorage.setItem('id_proceso',proceso.id_proceso);
      Swal.fire({type:'success',title:'Proceso Seleccionado',timer:1000,showConfirmButton:false});
    }

  }
}
