import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { WsService } from '../../services/ws.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';

// this.socket.connect(0);
@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['id_material', 'nombre', 'clave'];
  dataSource;
  datos;

 
  id_producto:any;
  id_proceso:any;
  id_materiales=[];
  bandMaterial:boolean;
  auxMateriales;

  constructor(private socket:SocketService,private ws:WsService) {
    this.id_producto=localStorage.getItem('id_producto');
    this.id_proceso=localStorage.getItem('id_proceso');
    
  }

  ngOnInit() {
    this.getMateriales(this.id_producto,this.id_proceso);
    this.id_materiales=JSON.parse(localStorage.getItem('id_material'))||[];
    console.log("Arreglo que se inicializa: ",this.id_materiales);
  }

  getMateriales(producto,proceso){
    this.ws.getMateriales(producto,proceso).subscribe(resp=>{
      if(resp!=null){
        this.datos=resp['data'];
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
      }
    });
  }

  selectMaterial(material){
    console.log("cuando selecciona material: ",this.id_materiales);
    console.log("material que pasamos: ",material);
    for(let i=0;i<this.id_materiales.length;i++){
      if(this.id_materiales[i]==material){
        console.log("Lo encontro");
      }else{
        console.log("no esta");
      }
    }
      console.log("incluye: ",this.id_materiales.indexOf(material));
      if(this.id_materiales.includes(material)){
        console.log("Ya esta seleccionado");
        var index= this.id_materiales.indexOf(material);
        if(index > -1){
          console.log("se Elimina");
          this.id_materiales.splice(index,1);
          console.log("nuevo arreglo: ",this.id_materiales);
          Swal.fire({type:'error',title:'Material Eliminado',timer:1000,showConfirmButton:false});
          localStorage.setItem('id_material',JSON.stringify(this.id_materiales));
          this.ws.material.next(this.id_materiales);
        }

      }else{
        this.id_materiales.push(material);
        localStorage.setItem('id_material',JSON.stringify(this.id_materiales));
        this.ws.material.next(this.id_materiales);
        Swal.fire({type:'success',title:'Material Seleccionado',timer:1000,showConfirmButton:false});
      }
      /*  this.ws.material.next(this.id_materiales);
      localStorage.setItem('id_materiales',JSON.stringify(this.id_materiales)); */
      
  }  

}
