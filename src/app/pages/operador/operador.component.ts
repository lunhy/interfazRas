import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { WsService } from '../../services/ws.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SocketService } from '../../services/socket.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AltaComponent } from './alta/alta.component';
import { BajaComponent } from './baja/baja.component';

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
  
  
  constructor(private webService:WsService,private socket:SocketService,private dialog: MatDialog) {
    this.id_proceso=localStorage.getItem('id_proceso');
    this.webService.id_operador.subscribe(resOpe=>{
      if(resOpe!=null){
        this.datos=resOpe;
      }
    });
    
    if(localStorage.getItem('id_operadores')){
      this.datos=JSON.parse(localStorage.getItem('id_operadores'));
    }
  } 
  
  ngOnInit() {
    if(localStorage.getItem('id_operadores')){
      this.datos=JSON.parse(localStorage.getItem('id_operadores'));
    }    
    if(this.datos!=null){
      this.dataSource= new MatTableDataSource(this.datos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
  
  altaOperador(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data={
      id_proceso:this.id_proceso
    }
    const dialogRefAlta=this.dialog.open(AltaComponent,dialogConfig);

    dialogRefAlta.afterClosed().subscribe(result => {
      if(result!=null){
        if(result.length>0){
          for(let i=0; i<result.length; i++){
            var data={
              'Nombre':result[i].Nombre,
              'APP':result[i].APP,
              'APM':result[i].APM,
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

  bajaOperador(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data={
      operadoresActivos:this.datos
    }
    const dialogRefBaja=this.dialog.open(BajaComponent,dialogConfig);

    dialogRefBaja.afterClosed().subscribe(result => {
      if(result!=null){
        this.datos=result;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
