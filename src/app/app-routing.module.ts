import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosComponent } from './libros/libros.component';
import { CategoriasComponent } from './categorias/categorias.component';

const routes: Routes = [
  { path: "libros", component: LibrosComponent },
  { path: "categorias", component: CategoriasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
