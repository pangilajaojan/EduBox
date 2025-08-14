import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DevicesPage {
  isScanning = false;
  isConnected = false;
  selectedDevice: any = null;
  
  availableDevices = [
    {
      id: '1',
      name: 'EduBox LED Cube 001',
      type: 'LED Cube',
      status: 'available',
      battery: 85,
      signal: 'strong',
      lastSeen: '2 minutes ago',
      firmware: 'v2.1.0'
    },
    {
      id: '2',
      name: 'EduBox LED Cube 002',
      type: 'LED Cube',
      status: 'connected',
      battery: 92,
      signal: 'strong',
      lastSeen: 'Connected',
      firmware: 'v2.1.0'
    },
    {
      id: '3',
      name: 'EduBox Controller',
      type: 'Controller',
      status: 'available',
      battery: 45,
      signal: 'medium',
      lastSeen: '5 minutes ago',
      firmware: 'v1.8.2'
    }
  ];

  connectedDevices = this.availableDevices.filter(device => device.status === 'connected');

  startScan() {
    this.isScanning = true;
    
    // Simulate scanning
    setTimeout(() => {
      this.isScanning = false;
      // In real implementation, this would populate with actual discovered devices
    }, 3000);
  }

  stopScan() {
    this.isScanning = false;
  }

  connectDevice(device: any) {
    device.status = 'connecting';
    
    // Simulate connection process
    setTimeout(() => {
      device.status = 'connected';
      this.isConnected = true;
      this.selectedDevice = device;
      this.updateConnectedDevices();
    }, 2000);
  }

  disconnectDevice(device: any) {
    device.status = 'disconnecting';
    
    // Simulate disconnection process
    setTimeout(() => {
      device.status = 'available';
      this.isConnected = false;
      this.selectedDevice = null;
      this.updateConnectedDevices();
    }, 1000);
  }

  updateConnectedDevices() {
    this.connectedDevices = this.availableDevices.filter(device => device.status === 'connected');
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'available': '#28a745',
      'connected': '#1972a4',
      'connecting': '#f5b202',
      'disconnecting': '#dc3545'
    };
    return colors[status] || '#6c757d';
  }

  getSignalIcon(signal: string): string {
    const icons: { [key: string]: string } = {
      'strong': 'wifi',
      'medium': 'wifi-outline',
      'weak': 'wifi-outline'
    };
    return icons[signal] || 'wifi-outline';
  }

  getSignalColor(signal: string): string {
    const colors: { [key: string]: string } = {
      'strong': '#28a745',
      'medium': '#f5b202',
      'weak': '#dc3545'
    };
    return colors[signal] || '#6c757d';
  }

  getBatteryColor(battery: number): string {
    if (battery > 60) return '#28a745';
    if (battery > 30) return '#f5b202';
    return '#dc3545';
  }

  getBatteryIcon(battery: number): string {
    if (battery > 80) return 'battery-full';
    if (battery > 60) return 'battery-three-quarters';
    if (battery > 40) return 'battery-half';
    if (battery > 20) return 'battery-quarter';
    return 'battery-dead';
  }

  refreshDevices() {
    // Simulate refresh
    this.availableDevices.forEach(device => {
      if (device.status === 'available') {
        device.lastSeen = 'Just now';
        device.battery = Math.max(0, device.battery - Math.floor(Math.random() * 5));
      }
    });
  }

  updateFirmware(device: any) {
    device.status = 'updating';
    
    // Simulate firmware update
    setTimeout(() => {
      device.firmware = 'v2.2.0';
      device.status = 'connected';
    }, 5000);
  }
}
