import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from './categorias.service';
import { Categorias } from './categorias';
import { LibrosService } from '../libros/libros.service';
import { Libros } from '../libros/libros';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(
    private categorias_service: CategoriasService,
    private libros_service: LibrosService,
    private formBuilder: FormBuilder
  ) { }
  categorias !: Categorias[]
  libros !: Libros[]
  formGroup !: FormGroup
  id_editado !: number
  elemento ?: Categorias
  editando !: boolean
  mostrarForm !: boolean | undefined

  ngOnInit(): void {
    this.obtener_categorias();
    this.construirFormulario();
    this.mostrarForm = false
    this.editando = true
  }

  construirFormulario(){
    this.formGroup = this.formBuilder.group({
      id_categoria : 0,
      nombre_categoria : ['', Validators.required],
      id_libro : ''
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

  obtener_categorias(){
    this.categorias_service.obtener_categorias().subscribe((json: any) => {
      console.log(json)
      this.categorias = json
      console.log(this.categorias)
    }, (error) => {
      console.log(error)
    })
  }

  guardarElemento(){
    if(this.formGroup.status !== 'INVALID'){
      let form = this.obtener_formulario()
      this.categorias_service.guardar_categorias(form).subscribe((response: any) => {
        this.formGroup.reset()
        this.obtener_categorias()
      }, (error) => {
        console.log(error)
      })
    }
  }

  obtener_formulario(){
    let form = new FormData
    form.append("nombre_categoria", this.formGroup.get("nombre_categoria")?.value)
    form.append("id_libro", this.formGroup.get("id_libro")?.value)
    return form
  }

  eliminar_categoria(id: number){
    var elemento = this.categorias.find(f => f.id_categoria === id)
    let form = new FormData()
    form.append('id_categoria', elemento!.id_categoria+"")
    form.append('nombre_categoria', elemento!.nombre_categoria)
    form.append('id_libro', elemento!.id_libro+"")

    this.categorias_service.eliminar_categorias(form).subscribe((response: any) => {
      this.obtener_categorias()
    },(error) => {
      console.log(error)
    })
  }

  editar_categoria(id : number){
    this.editando = true
    this.mostrarForm = true
    this.id_editado = id
    this.elemento = this.categorias.find(f => f.id_categoria === id)
    this.formGroup.get("nombre_categoria")?.setValue(this.elemento?.nombre_categoria)
  }

  actualizar_categoria(){
    if(this.formGroup.status !== 'INVALID'){
      let form = this.obtener_formulario()
      form.append("id_categoria", this.id_editado+"")
      this.categorias_service.actualizar_categorias(form).subscribe((response: any) => {
        this.formGroup.reset()
        this.obtener_categorias()
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

}
