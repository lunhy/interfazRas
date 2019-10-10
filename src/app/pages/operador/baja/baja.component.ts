import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef, MatTableDataSource, MatSort, MatDialogConfig } from '@angular/material';
import { WsService } from '../../../services/ws.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.css']
})
export class BajaComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedRowIndex=-1;
  datos=[];
  dataSource;
  displayedColumns: string[] = ['Nombre','APP', 'APM'];

  constructor(private dialogRef: MatDialogRef<BajaComponent>, @Inject(MAT_DIALOG_DATA) data,
              private dialog:MatDialog,
              private ws:WsService) {
    console.log("datos Baja operador: ",data);
    this.datos=data.operadoresActivos;
  }

  ngOnInit() {
    this.dataSource= new MatTableDataSource(this.datos);
      this.dataSource.sort = this.sort;
  } 

  selectUsuario(id){
    console.log("id operador: ",id);
    this.selectedRowIndex=id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRefpass = this.dialog.open(passBaja,dialogConfig);
    dialogRefpass.afterClosed().subscribe(result => {
        if(result!=null && result.trim().length!=0){
          this.ws.altaOperador(id,result).subscribe(resp=>{
            if(resp!=null){
              if(resp['estado']=='success'){
                var auxDatos=[];
                for(let i=0; i<this.datos.length; i++){
                  if(this.datos[i].id_operador!=id){
                    auxDatos.push(this.datos[i]);
                  }
                }
                this.datos=auxDatos;
                
                localStorage.removeItem('id_operadores');
                localStorage.setItem('id_operadores',JSON.stringify(this.datos));
                this.ws.operador.next(this.datos);
                this.dataSource= new MatTableDataSource(this.datos);
                this.dataSource.sort = this.sort;
                Swal.fire({type:'success',title:'Operador dado de baja',timer:1000,showConfirmButton:false});
              }else{
                Swal.fire({type:'error',title:'Contraseña incorrecta',timer:1000,showConfirmButton:false});
              }
            }
          });
          
        }else{
          console.log("No contiene caracteres");
        }
    });
  }

}

@Component({
  selector: 'passBaja',
  templateUrl: 'passBaja.html',
  styleUrls: ['./baja.component.css']
})
export class passBaja {
  id_operador;
  pass:string; 

  constructor(public dialogRefpassBajaO: MatDialogRef<passBaja>,@Inject(MAT_DIALOG_DATA) public data) {
      
    }

  save(): void {
    this.dialogRefpassBajaO.close();
  }
  close(): void {
    this.dialogRefpassBajaO.close();
  }



}
