import { Component, signal, inject, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { UsuarioServicio } from '../../service/usuario-servicio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuarios',
  imports: [FormsModule],
  templateUrl: './formulario-usuarios.html',
  styleUrl: './formulario-usuarios.css',
})
export class FormularioUsuarios implements OnInit {

  private usuarioService = inject(UsuarioServicio);

  listaUsuarios = signal<Usuario[]>([]);

  nuevoUsuario: Usuario = {
    cedula: '',
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  };

  editando = false;
  usuarioEditandoId: string | null = null;

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(users =>{
      this.listaUsuarios.set(users);
    });
  }
    
  registrarUsuario() {
    if (this.editando && this.usuarioEditandoId) {
      console.log('Actualizando inscripción:', this.nuevoUsuario);
      this.usuarioService.updateUsuario(this.usuarioEditandoId, this.nuevoUsuario).subscribe({
        next: (res) => {
          const usuarioActualizado = { ...this.nuevoUsuario, id: this.usuarioEditandoId! };
          this.listaUsuarios.update(users => users.map(u => u.id === this.usuarioEditandoId ? usuarioActualizado : u));
          this.resetForm();
          console.log('Inscripción actualizada', res);
        },
        error: (err) => {
          console.error('Error al actualizar en Firebase:', err);
        }
      });
    } else {
      console.log('Registrando nueva inscripción:', this.nuevoUsuario);
      this.usuarioService.postUsuario(this.nuevoUsuario).subscribe({
        next: (res: any) => {
          // Firebase devuelve el ID en la propiedad 'name'
          const id = res.name ? res.name : res.id;
          const usuarioCreado = { ...this.nuevoUsuario, id: id };
          this.listaUsuarios.set([usuarioCreado, ...this.listaUsuarios()]);
          this.resetForm();
          console.log('Inscripción registrada', res);
        },
        error: (err) => {
          console.error('Error al guardar en Firebase:', err);
        }
      });
    }
  }

  seleccionarParaEditar(usuario: Usuario) {
    this.nuevoUsuario = { ...usuario };
    this.editando = true;
    this.usuarioEditandoId = usuario.id!;
  }

  cancelarEdicion() {
    this.resetForm();
  }

  resetForm() {
    this.nuevoUsuario = { cedula: '', nombre: '', email: '', telefono: '', direccion: '' };
    this.editando = false;
    this.usuarioEditandoId = null;
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Desea eliminar la inscripción de forma permanente?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.listaUsuarios.update(users => users.filter(u => u.id !== id));
      });
    }
  }
}
