import { Component, OnInit, ViewChild } from '@angular/core';
import { WsService } from '../../services/ws.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SocketService } from '../../services/socket.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.css']
})
export class OperadorComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  id_proceso;
  operadorGuardado;
  dataSource;
  datos;
  led1=1;
  led2=0;
  displayedColumns: string[] = ['id_empleado', 'nivel'];
  
  
  constructor(private webService:WsService,private socket:SocketService) {
    this.id_proceso=localStorage.getItem('id_proceso');
  } 
  
  ngOnInit() {
    this.getUsers(this.id_proceso);
    this.webService.id_operador.subscribe(operador=>{
      this.operadorGuardado=operador;
    });
    this.operadorGuardado=localStorage.getItem('id_operador');

  }

  getUsers(id){
      this.webService.getUsers(id).subscribe(resp=>{
        console.log("Desde WS: ",resp);
        if(resp){
          this.datos=resp['data'];
          this.dataSource= new MatTableDataSource(this.datos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
  }
  
  selectOperador(operador){
    console.log("operado: ",operador);
    if(operador.id_empleado == this.operadorGuardado){
      console.log("son iguales");
      this.webService.operador.next(null);
      localStorage.setItem('id_operador',this.operadorGuardado);
      this.operadorGuardado=localStorage.removeItem('id_operador');
      Swal.fire({type:'success',title:'Baja Operador',timer:1000,showConfirmButton:false});
    }else{
      this.webService.operador.next(operador.id_empleado);
      localStorage.setItem('id_operador',this.operadorGuardado);
      Swal.fire({type:'success',title:'Operador Seleccionado',timer:1000,showConfirmButton:false});
    }
  }
  azul(){
    if(this.led1===1){
      this.socket.azul(0);
      this.led1=0;
    }else{
      this.socket.azul(1);
      this.led1=1;
    }
  }
  verde(){
    if(this.led1===1){
      this.socket.verde(0);
      this.led1=0;
    }else{
      this.socket.verde(1);
      this.led1=1;
    }
  }
  amarillo(){
    if(this.led1===1){
      this.socket.amarillo(0);
      this.led1=0;
    }else{
      this.socket.amarillo(1);
      this.led1=1;
    }
  }
  alerta(){
    if(this.led2===1){
      this.socket.alerta(0);
      this.led2=0;
    }else{
      this.socket.alerta(1);
      this.led2=1;
    }
  }
}
