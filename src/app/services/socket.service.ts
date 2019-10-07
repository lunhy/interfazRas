import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  azul(id){
    this.socket.emit('azul',id);
  }
  verde(id){
    this.socket.emit('verde',id);
  }
  amarillo(id){
    this.socket.emit('amarillo',id);
  }
  alerta(id){
    this.socket.emit('alerta',id);
  }
}
