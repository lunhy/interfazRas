import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  id_proceso:any;
  nombre;
  apellidop;
  apellidom;
  id_operador;
  datos=[];
  operadores=[];
  datosOperadores=[];
  dataSource;
  displayedColumns: string[] = ['Nombre','ApellidoPaterno', 'ApellidoMaterno'];


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
        for(let i =0; i<resp['data'].length; i++){
          var data={
            'nombre':this.titleCaseWord(resp['data'][i].Nombre),
            'app':this.titleCaseWord(resp['data'][i].App),
            'apm':this.titleCaseWord(resp['data'][i].Apm),
            'id_operador':resp['data'][i].Id_Empleado
          }
          this.datos.push(data);
        }
        this.dataSource= new MatTableDataSource(this.datos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      }
    });
  }

  selectUsuario(id){
    console.log("id operador: ",id);
    const dialogRefpass = this.dialog.open(pass, {
      width: '250px'
    });
    dialogRefpass.afterClosed().subscribe(result => {
        if(result!=null && result.trim().length!=0){

          this.ws.altaOperador(id,result).subscribe(resp=>{
            if(resp!=null){
              if(resp['estado']=='success'){
                Swal.fire({type:'success',title:'Operador Seleccionado',timer:1000,showConfirmButton:false});
                console.log(this.datos);
                for(let i=0; i<this.datos.length; i++){
                  if(this.datos[i].id_operador==resp['data']['0'].Id_Empleado){
                    console.log(this.datos[i]);
                    this.datosOperadores.push(this.datos[i]);
                  }
                  this.operadores.push(resp['data']['0'].Id_Empleado);
                }
              }else if(resp['estado']=='error'){
                Swal.fire({type:'error',title:'Contraseña Incorrecta',timer:1000,showConfirmButton:false});
              }
            }
          });
        }else{
          console.log("No contiene caracteres")
        }
    });
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
}

@Component({
  selector: 'pass',
  templateUrl: 'pass.html',
})
export class pass {
  id_operador;
  pass:string;
  constructor(
    public dialogRefpass: MatDialogRef<pass>,@Inject(MAT_DIALOG_DATA) public data) {
      
    }

  save(): void {
    this.dialogRefpass.close();
  }
  close(): void {
    this.dialogRefpass.close();
  }



}