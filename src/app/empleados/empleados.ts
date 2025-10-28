import { Component } from '@angular/core';
import { Empleadoservice } from '../core/services/empleadoservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css',
})
export class Empleados {
  empleados:any[]=[];

  nuevoEmpleado: any = {
    nombre: '',
    apellido: '',
    correo: '',
    salario: 0
  };

   mensaje: string = '';

  constructor(private empleadoService:Empleadoservice) {
        this.listarEmpleados();
  }
  listarEmpleados():void
  {

    this.empleadoService.listaEmpleados().subscribe({
      next:(data)=> {
        this.empleados = data;
        console.log(this.empleados);
      
      },
      error:(err)=>console.error('error al cargar empleados',err)
    });

  }
  
  agregarEmpleado(form: NgForm): void {
    this.empleadoService.crearEmpleado(this.nuevoEmpleado).subscribe({
      next: (empleado) => {
        this.empleados.push(empleado); 

        this.mensaje = '✅ Empleado agregado correctamente';

        form.resetForm();

        this.nuevoEmpleado = { nombre: '', apellido: '', correo: '', salario: 0 };
         setTimeout(() => this.mensaje = '', 3000);
      },
      error: (err) => {
      console.error('Error al agregar empleado', err);
      this.mensaje = '⚠️ Error al agregar empleado';
      setTimeout(() => this.mensaje = '', 3000);
    }
    });
  }

}
