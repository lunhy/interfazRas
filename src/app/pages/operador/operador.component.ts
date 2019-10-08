import { Component, OnInit, ViewChild } from '@angular/core';
import { WsService } from '../../services/ws.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SocketService } from '../../services/socket.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AltaComponent } from './alta/alta.component';

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
  datos=[];
  led1=1;
  led2=0;
  displayedColumns: string[] = ['Nombre','APP','APM'];
  
  
  constructor(private webService:WsService,private socket:SocketService,private dialog: MatDialog,) {
    this.id_proceso=localStorage.getItem('id_proceso');
  } 
  
  ngOnInit() {
    this.webService.id_operador.subscribe(operador=>{
      this.operadorGuardado=operador;
    });
    this.operadorGuardado=JSON.parse(localStorage.getItem('id_operadores'));

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
  alta(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data={
      id_proceso:this.id_proceso
    }
    const dialogRefalta=this.dialog.open(AltaComponent,dialogConfig);

    dialogRefalta.afterClosed().subscribe(result => {
      if(result!=null){
        if(result.length>0){
          for(let i=0; i<result.length; i++){
            var data={
              'Nombre':result[i].nombre,
              'APP':result[i].app,
              'APM':result[i].apm,
              'id_operador':result[i].id_operador
            }
            this.datos.push(data);
          }
          localStorage.removeItem('id_operadores');
          localStorage.setItem('id_operadores',JSON.stringify(this.datos));
          this.webService.operador.next(this.datos);
          this.dataSource= new MatTableDataSource(this.datos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }  
    });
  }
}
