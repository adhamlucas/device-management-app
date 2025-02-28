import { Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component'
import { DeviceComponent } from './pages/device/device.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'category',
  }, 
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'device',
    component: DeviceComponent
  }
];
