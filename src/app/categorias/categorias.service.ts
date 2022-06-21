import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CategoriasService {
    constructor(private httpClient : HttpClient) { }

    obtener_categorias(){
        return this.httpClient.get(environment.server + "index.php/Categorias/consultarCategorias")
    }
    guardar_categorias(elemento : FormData){
        return this.httpClient.post(environment.server + "index.php/Categorias/guardarCategoria", elemento)
    }
    eliminar_categorias(elemento: FormData){
        return this.httpClient.post(environment.server + "index.php/Categorias/eliminarCategoria", elemento)
    }
    actualizar_categorias(elemento: FormData){
        return this.httpClient.post(environment.server + "index.php/Categorias/actualizarCategoria", elemento)
    }
}