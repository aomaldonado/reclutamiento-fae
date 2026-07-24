import { Component } from '@angular/core';
import { FormularioUsuarios } from '../../shared/formulario-usuarios/formulario-usuarios';
@Component({
  selector: 'app-usuarios',
  imports: [FormularioUsuarios],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {}
