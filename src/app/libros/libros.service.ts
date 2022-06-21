import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Libros } from './libros'; 

@Injectable({
    providedIn: 'root'
})

export class LibrosService {
    constructor(private httpClient : HttpClient) { }

    obtener_libros(){
        return this.httpClient.get(environment.server + "index.php/Libros/consultarLibros")
    }
    guardar_libro(elemento : FormData){
        return this.httpClient.post(environment.server + "index.php/Libros/guardarLibro", elemento)
    }
    eliminar_libro(elemento: FormData){
        return this.httpClient.post(environment.server + "index.php/Libros/eliminarLibro", elemento)
    }
    actualizar_libro(elemento: FormData){
        return this.httpClient.post(environment.server + "index.php/Libros/actualizarLibro", elemento)
    }
}