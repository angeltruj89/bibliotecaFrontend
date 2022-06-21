import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libros } from './libros';
import { LibrosService } from './libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  constructor(
    private libros_service : LibrosService,
    private formbuilder : FormBuilder
  ) { }

  libros !: Libros[]
  formGroup !: FormGroup
  id_editado !: number
  elemento ?: Libros
  editando !: boolean
  mostrarForm !: boolean | undefined

  ngOnInit(): void {
    this.obtener_libros();
    this.construirFormulario();
    this.mostrarForm = false
    this.editando = true
  }
  
  construirFormulario(){
    this.formGroup = this.formbuilder.group({
      id_libro : 0,
      nombre_libro : ['', Validators.required],
      id_categoria : ''
    })
  }

  obtener_libros(){
    this.libros_service.obtener_libros().subscribe((json: any) => {
      console.log(json)
      this.libros = json
      console.log(this.libros)
    }, (error) => {
      console.log(error)
    })
  }

  guardarElemento(){
    if(this.formGroup.status !== 'INVALID'){
      let form = this.obtener_formulario()
      this.libros_service.guardar_libro(form).subscribe((response: any) => {
        this.formGroup.reset()
        this.obtener_libros()
      }, (error) => {
        console.log(error)
      })
    }
  }

  obtener_formulario(){
    let form = new FormData
    form.append("nombre_libro", this.formGroup.get("nombre_libro")?.value)
    form.append("id_categoria", this.formGroup.get("id_categoria")?.value)
    return form
  }

  eliminar_libro(id: number){
    var elemento = this.libros.find(f => f.id_libro === id)
    let form = new FormData()
    form.append('id_libro', elemento!.id_libro+"")
    form.append('nombre_libro', elemento!.nombre_libro)
    form.append('id_categoria', elemento!.id_categoria+"")

    this.libros_service.eliminar_libro(form).subscribe((response: any) => {
      this.obtener_libros()
    },(error) => {
      console.log(error)
    })
  }

  editar_libro(id : number){
    this.editando = true
    this.mostrarForm = true
    this.id_editado = id
    this.elemento = this.libros.find(f => f.id_libro === id)
    this.formGroup.get("nombre_libro")?.setValue(this.elemento?.nombre_libro)
  }

  actualizar_libro(){
    if(this.formGroup.status !== 'INVALID'){
      let form = this.obtener_formulario()
      form.append("id_libro", this.id_editado+"")
      this.libros_service.actualizar_libro(form).subscribe((response: any) => {
        this.formGroup.reset()
        this.obtener_libros()
      }, (error) => {
        console.log(error)
      })
    }
  }

  mostrandoForm(){
    this.mostrarForm = true
    this.editando = !this.editando
    this.formGroup.reset()
  }
  ocultarForm(){
    this.mostrarForm = false
  }

  validarControl(controlName: string, formulario: string): string {
    let error = '';
    var control = this.formGroup.get(controlName) || { touched: false };
    if (control.touched && control.errors != null) {

      error = this.obtenerMensajeDeError(control.errors)
    }
    return error;
  }

  obtenerMensajeDeError(errores: any) {
    let mensaje = ''
    if (errores.email) {
      mensaje += "EL EMAIL INGRESADO NO TIENE EL FORMATO CORRECTO"
    }
    if (errores.required) {
      mensaje += 'CAMPO REQUERIDO'
    }
    if (errores.no_seleccionado) {
      mensaje += errores.no_seleccionado
    }
    return mensaje
  }

}
