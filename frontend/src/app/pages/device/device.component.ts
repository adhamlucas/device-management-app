import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-device',
  imports: [
    MatTableModule,
    MatButton,
    MatIcon
  ],
  templateUrl: './device.component.html',
  styleUrl: './device.component.css'
})
export class DeviceComponent implements OnInit {
  devices: Device[] = []
  constructor(private deviceService: DeviceService) {}
  
  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (devices) => this.devices = devices
    })
  }

  displayedColumns: string[] = ['id', 'categoryId', 'color', 'partNumber', 'actions']
}
