import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { datosPC } from '../modelos/datosPC.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseI } from '../modelos/Response.interface';
import { datosUnitarios } from '../modelos/datosUnitarios.interface';
import { reportesPC } from '../modelos/reportesPC.interface';
import { reportesUnitarios } from '../modelos/reportesUnitarios.interface';
import { datosReportes } from '../modelos/datosReportes.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<datosPC[]>{
    return this.http.get<datosPC[]>('/api/datospc');
  }

  getAllrep(): Observable<reportesPC[]>{
    return this.http.get<reportesPC[]>('/api/reportespc')
  }

  getSinglePC(): Observable<datosUnitarios>{
    return this.http.get<datosUnitarios>('/api/datospc')
  }

  getSingleReporte(): Observable<reportesUnitarios>{
    return this.http.get<reportesUnitarios>('/api/reportespc')
  }

  crearDatosPC(form: datosUnitarios): Observable<ResponseI>{
    return this.http.post<ResponseI>('/api/datospc', form)
  }
  
  crearReportesPC(form: reportesUnitarios): Observable<ResponseI>{
    return this.http.post<ResponseI>('/api/reportespc', form)
  }

  actualizarDatosPC(form: datosUnitarios): Observable<ResponseI>{
    return this.http.put<ResponseI>('/api/datospc', form)
  } 

  actualizarReportesPC(form: reportesUnitarios): Observable<ResponseI>{
    return this.http.put<ResponseI>('/api/reportespc', form)
  }

  borrarDatosPC(form: datosUnitarios): Observable<ResponseI>{
    let options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
      body:form
    }
    return this.http.delete<ResponseI>('/api/datospc', options)
  } 

}
