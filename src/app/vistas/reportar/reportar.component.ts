import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { reportesPC } from 'src/app/modelos/reportesPC.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { reportesUnitarios } from 'src/app/modelos/reportesUnitarios.interface';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.css']
})
export class ReportarComponent implements OnInit {

  constructor(private router:Router, private apiService:ApiService) { }

  reportesdePC:reportesPC[];
  reportesUnitarios:reportesUnitarios;

  reportesCapturados = new FormGroup ({
    id: new FormControl(''),
    ubicacion: new FormControl(''),
    aula: new FormControl(''),
    serie: new FormControl(''),
    estatus: new FormControl('', Validators.required),
    observaciones: new FormControl('')
  })

  ngOnInit(): void {
    this.apiService.getAllrep().subscribe((resp:any)=> {
      this.reportesdePC = resp;
    })
  }

  getReportesUnitarios(reporte: reportesPC): void{
    this.reportesCapturados.setValue({
      'id': reporte.id,
      'ubicacion': reporte.ubicacion,
      'aula': reporte.aula,
      'serie': reporte.serie,
      'estatus': reporte.estatus,
      'observaciones': reporte.observaciones
      })
  }

  actualizarReportesPC(form: reportesUnitarios){
    this.apiService.actualizarReportesPC(form).subscribe((resp:any)=> {
      alert("Reporte Actualizado con Éxito")
      document.location.reload();
    })
  }

  contarFilas(){
    var num = document.getElementById('tblDatos').getElementsByTagName('tr').length -1;
    alert("LOS EQUIPOS REPORTADOS SON: "+num)
  }

  Regresar(){
    this.router.navigate(['lista']);
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  name='reportesPC.xlsx';
  exportarExcel():void{
    let element = document.getElementById('tblDatos');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
