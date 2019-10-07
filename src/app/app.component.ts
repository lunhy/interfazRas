import { Component, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { WsService } from './services/ws.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interfazAngular';

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  
  constructor(private ws:WsService,private router:Router){
    
  }
  altaProceso() {
    this.sidenav.close();
    this.router.navigateByUrl('home');
  }
  regresar(){
    this.sidenav.close();
    this.router.navigateByUrl('home');
  }

}
