import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }


  menuItems = signal<MenuItem[]>([
    {
      icon: 'category',
      label: 'Category',
      route: 'category'
    },
    {
      icon: 'devices',
      label: 'Device',
      route: 'device'
    }
  ])
}
