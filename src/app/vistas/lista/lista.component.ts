import { Component, OnInit } from '@angular/core';
import { datosPC } from 'src/app/modelos/datosPC.interface';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { datosUnitarios } from 'src/app/modelos/datosUnitarios.interface';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { reportesUnitarios } from 'src/app/modelos/reportesUnitarios.interface';
import { datosReportes } from 'src/app/modelos/datosReportes.interface';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private apiService: ApiService, private router:Router) { }

  datosdePC:datosPC[]; //Array para el llenado de la Tabla
  datosUnitarios:datosUnitarios; //Para el envio del primer Modal

  DatosUnitariosV2: datosReportes; // Llenar la informacion del primer Modal con el segundo Modal
  reportesUnitarios: reportesUnitarios; //Para el envio del segundo Modal

  //Para el llenado del primer Modal
  datosCapturados = new FormGroup({
    id: new FormControl(''),
    ubicacion: new FormControl('', Validators.required),
    aula: new FormControl('', Validators.required),
    ip: new FormControl('', Validators.required), 
    serie: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    procesador: new FormControl('', Validators.required),
    ram: new FormControl('', Validators.required),
    almacenamiento: new FormControl('', Validators.required),
    so: new FormControl('', Validators.required),
    observaciones: new FormControl(''),
    programas:new FormControl('')
  })

  //Traer informacion al segundo Modal
  reportesCapturados = new FormGroup({
    id: new FormControl(''),
    ubicacion: new FormControl(''),
    aula: new FormControl(''),
    serie: new FormControl('')
  })

  //Datos restantes del segundo Modal
  masDatos = new FormGroup({
    id: new FormControl(''), //jala
    ubicacion: new FormControl(''),
    aula: new FormControl(''),
    serie: new FormControl(''),
    observaciones: new FormControl('', Validators.required), //jala
    estatus: new FormControl('ACTIVO') //jala
  })

  ngOnInit(): void {
    this.apiService.getAll().subscribe((resp:any)=> {
      this.datosdePC = resp;
    })
  }

  getReportesUnitarios(reporte: datosPC): void{
    this.reportesCapturados.setValue({
      'id': reporte.id,
      'ubicacion': reporte.ubicacion,
      'aula': reporte.aula,
      'serie': reporte.serie,
      })
  }

  crearReportesPC(form: reportesUnitarios, reportesCapturados){
    form.ubicacion = reportesCapturados.ubicacion
    form.aula = reportesCapturados.aula
    form.serie = reportesCapturados.serie
    this.apiService.crearReportesPC(form).subscribe(resp =>{
      alert("Solicitud de Reporte Enviada con Éxito")
      document.location.reload()
    })
  }

  crearDatosPC(form: datosUnitarios){
    this.apiService.crearDatosPC(form).subscribe(resp =>{
      alert("Equipo Registrado con Éxito")
      document.location.reload()
    })
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  displayStyle2 = "none";
  
  openPopup2() {
    this.displayStyle2 = "block";
  }
  closePopup2() {
    this.displayStyle2 = "none";
  }

  contarFilas(){
    var num = document.getElementById('tblDatos').getElementsByTagName('tr').length -1;
    alert("LOS EQUIPOS REGISTRADOS SON: "+num)
  }

  cancelar(){
    this.datosCapturados.reset();
  }

  reportarEquipo(){
    this.router.navigate(['reportar']);
  }

  name='inventarioPC.xlsx';
  exportarExcel():void{
    let element = document.getElementById('tblDatos');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
