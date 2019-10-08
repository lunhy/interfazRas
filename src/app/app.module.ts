import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatSortModule, MatInputModule, MatPaginatorModule, 
          MatFormFieldModule, MatCardModule, MatGridListModule, MatIconModule, 
          MatSidenavModule, MatListModule, MatButtonModule, MatTableModule , MatDialogModule } from  '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HomeComponent } from './pages/home/home.component';
import { MaterialComponent } from './pages/material/material.component';
import { OperadorComponent } from './pages/operador/operador.component';
import { ProcesoComponent } from './pages/proceso/proceso.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { AltaComponent, pass } from './pages/operador/alta/alta.component';
const config: SocketIoConfig = { url: 'http://192.168.2.107:3000', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MaterialComponent,
    OperadorComponent,
    ProcesoComponent,
    ProductoComponent,
    AltaComponent,
    pass,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AltaComponent,pass]
})
export class AppModule { }
