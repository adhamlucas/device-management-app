import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { Device } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDialogComponent } from '../../components/device-dialog/device-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(
    private deviceService: DeviceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe({
      next: (devices) => this.devices = devices
    })
  }

  openAddDeviceDialog(): void {
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(device => {
      if (device) {
        this.createDevice(device);
      }
    });
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snacbar-success']
    })
  }

  createDevice(device: Omit<Device, "id">) {
    this.deviceService.createDevice(device).subscribe({
      next: () => this.loadDevices(),
      error: (err) => {
        this.showMessage(err.message || "Error creating device")
      },
    })
  }

  deleteDevice(id: number) {
    this.deviceService.deleteDevice(id).subscribe({
      next: () => this.loadDevices(),
      error: (err) => {
        this.showMessage(err.message || "Error deleting device")
      }
    })
  }
  displayedColumns: string[] = ['id', 'categoryId', 'color', 'partNumber', 'actions']
}
