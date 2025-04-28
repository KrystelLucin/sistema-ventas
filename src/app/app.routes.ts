import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './pages/menu/menu.component';
import { OrdenComponent } from './pages/orden/orden.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { AdminClientesComponent } from './pages/admin-clientes/admin-clientes.component';
import { AdminProductosComponent } from './pages/admin-productos/admin-productos.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: '', 
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: 'menu', component: MenuComponent },
      { path: 'orden', component: OrdenComponent },
      { path: 'facturas', component: FacturasComponent },
      { path: 'admin-clientes', component: AdminClientesComponent },
      { path: 'admin-productos', component: AdminProductosComponent },
    ]
  },

  { path: '**', redirectTo: '' } 
];