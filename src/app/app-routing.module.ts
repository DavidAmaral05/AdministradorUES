import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './vistas/lista/lista.component';
import { ReportarComponent } from './vistas/reportar/reportar.component';
import { EditarReporteComponent } from './vistas/editar-reporte/editar-reporte.component';

const routes: Routes = [
  {path:'', redirectTo:'lista', pathMatch:'full'},
  {path:'lista', component:ListaComponent},
  {path:'reportar', component:ReportarComponent},
  {path:'editar', component:EditarReporteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ListaComponent, ReportarComponent]
