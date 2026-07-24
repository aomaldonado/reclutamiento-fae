import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Nosotros } from './features/nosotros/nosotros';
import { Usuarios } from './features/usuarios/usuarios';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: "home", component:Home},
    {path: "nosotros", component:Nosotros},
    {path: "usuarios", component:Usuarios}
];
