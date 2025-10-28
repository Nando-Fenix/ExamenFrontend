import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Empleado {
  nombre: string;
  apellido: string;
  correo: string;
  salario: number;

}
@Injectable({
  providedIn: 'root'
})
export class Empleadoservice {

   private base = 'http://127.0.0.1:8000/api/empleados';
   
  constructor(private http:HttpClient) {
    
    
  }

  listaEmpleados():Observable<any[]>{
    return this.http.get<any[]>(this.base);
  }
  crearEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.base, empleado);
  }
  
}
