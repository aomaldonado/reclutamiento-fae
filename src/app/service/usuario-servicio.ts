import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {
  private http = inject(HttpClient);

  private API_USUARIOS = 'https://andres-c92ea.firebaseio.com/inscripciones.json';

  //METDO POST
  postUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API_USUARIOS, usuario)
  }

  //METODO GET: PARA OBTENER DATOS DE FIREBASE
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<{ [key: string]: Usuario }>(this.API_USUARIOS).pipe(
      map(datos => {
        if (!datos) return [];
        return Object.keys(datos).map(id => ({
          ...datos[id], id: id
        }));
      })
    );
  }

  //METODO PUT: ACTUALIZAR DATOS DE USUARIO
  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    const url = this.API_USUARIOS.replace('.json', `/${id}.json`);
    return this.http.put<Usuario>(url, usuario);
  }

  //METODO DELETE: PARA ELIMINAR DATOS DE USUARIO POR ID
  deleteUsuario(id: string): Observable<void> {
    const url = this.API_USUARIOS.replace('.json', `/${id}.json`);
    return this.http.delete<void>(url);
  }
}
