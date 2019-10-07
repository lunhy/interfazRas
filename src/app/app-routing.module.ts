import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MaterialComponent } from './pages/material/material.component';
import { OperadorComponent } from './pages/operador/operador.component';
import { ProcesoComponent } from './pages/proceso/proceso.component';
import { ProductoComponent } from './pages/producto/producto.component';


const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'material',component:MaterialComponent},
  {path:'operador',component:OperadorComponent},
  {path:'proceso',component:ProcesoComponent},
  {path:'producto',component:ProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
