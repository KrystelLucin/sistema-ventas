import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { DesktopSidebarComponent } from './desktop-sidebar/desktop-sidebar.component';
import { MobileTabsComponent } from './mobile-tabs/mobile-tabs.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    HeaderComponent,
    DesktopSidebarComponent,
    MobileTabsComponent
  ]
})
export class LayoutComponent {}