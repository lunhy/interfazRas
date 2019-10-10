import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef, MatDialogConfig } from '@angular/material';
import { WsService } from '../../../services/ws.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedRowIndex=-1;

  id_proceso:any;
  nombre;
  apellidop;
  apellidom;
  id_operador;
  datos=[];
  operadores=[];
  datosOperadores=[];
  listaOperadores;
  displayedColumns: string[] = ['Nombre','APP', 'APM'];


  constructor(private dialogRef: MatDialogRef<AltaComponent>, @Inject(MAT_DIALOG_DATA) data,
              private ws:WsService, private dialog:MatDialog) {
                this.id_proceso=data.id_proceso; 
                console.log("en alta operador: ",this.id_proceso);
              
  }

  ngOnInit() {
    this.getUsers(this.id_proceso);
    console.log(this.operadores);
  }
  close() {
    this.dialogRef.close();
  }
  
  save(){
    this.dialogRef.close();
  }

  getUsers(id){
    this.ws.getUsers(id).subscribe(resp=>{
      console.log("Desde WS: ",resp);
      if(resp){
        var auxOperadores=JSON.parse(localStorage.getItem('id_operadores'));
        var bandOperador=false;
        for(let i =0; i<resp['data'].length; i++){
          bandOperador=false;
          if(auxOperadores!=null){
            for(let j=0; j<auxOperadores.length; j++){
              if(resp['data'][i].Id_Empleado==auxOperadores[j].id_operador){
                bandOperador=true;
                break;
              }
            }
          }
          if(bandOperador==false){
            var data={
              'Nombre':this.titleCaseWord(resp['data'][i].Nombre),
              'APP':this.titleCaseWord(resp['data'][i].App),
              'APM':this.titleCaseWord(resp['data'][i].Apm),
              'id_operador':resp['data'][i].Id_Empleado
            }
            this.datos.push(data);
          }
        }
   
        this.listaOperadores= new MatTableDataSource(this.datos);
        this.listaOperadores.sort = this.sort;
      }
    });
  }

  selectUsuario(id){
    console.log("id operador: ",id);
    this.selectedRowIndex=id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRefpass = this.dialog.open(passAlta,dialogConfig );
    dialogRefpass.afterClosed().subscribe(result => {
        if(result!=null && result.trim().length!=0){

          this.ws.altaOperador(id,result).subscribe(resp=>{
            console.log("respuesta alta: ",resp);
            if(resp!=null){
              if(resp['estado']=='success'){
                var auxDatos=[];
                Swal.fire({type:'success',title:'Operador Seleccionado',timer:1000,showConfirmButton:false});
                console.log(this.datos);
                for(let i=0; i<this.datos.length; i++){
                  if(this.datos[i].id_operador==resp['data']['0'].Id_Empleado){
                    console.log(this.datos[i]);
                    this.datosOperadores.push(this.datos[i]);
                  }else{
                    auxDatos.push(this.datos[i]);
                  }
                  this.listaOperadores= new MatTableDataSource(auxDatos);
                  this.listaOperadores.sort = this.sort;
                  this.operadores.push(resp['data']['0'].Id_Empleado);
                }
              }else if(resp['estado']=='error'){
                Swal.fire({type:'error',title:'Contraseña Incorrecta',timer:1000,showConfirmButton:false});
              }
            }  
          });
        }else{
          console.log("No contiene caracteres");
        }
    });
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}

@Component({
  selector: 'passAlta',
  templateUrl: 'passAlta.html',
  styleUrls: ['./alta.component.css']
})
export class passAlta {
  id_operador;
  pass:string;
  constructor(public dialogRefpass: MatDialogRef<passAlta>,@Inject(MAT_DIALOG_DATA) public data) {
      
    }

  save(): void {
    this.dialogRefpass.close();
  }
  close(): void {
    this.dialogRefpass.close();
  }



}