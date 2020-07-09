import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Device} from '../../../models/interfaces';
import {ServiceService} from '../../../services/service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  devicesData: MatTableDataSource<Device> = new MatTableDataSource([]);
  serviceConfig = [];
  allDataCounts: [];
  page = 1;
  isFinish = false;
  isLoading = false;

  activeFilters = localStorage.getItem('notifications.activeFilters') ?
    JSON.parse(localStorage.getItem('notifications.activeFilters')) : {
    isRS: false,
    isWE: false,
    isUE: false,
    isTP: false,
    isCL: false,
    isOL: false,
    isFL: false,
    isBV: false,
    onlineService: false
  };

  displayedColumns = [
    'checkbox',
    'make',
    'model',
    'type',
    'modification',
    'year',
    'millage',
    'RS',
    'WE',
    'UE',
    'TP',
    'CL',
    'OL',
    'FL',
    'BV',
    'onlineService',
    // 'offlineService',
    'dataUpdate',
    'fake'
  ];

  activeDevices: number[] = [];
  dismissNotifications = {
    time: 0,
    devices: []
  };

  constructor(
    private serviceService: ServiceService
  ) { }

  ngOnInit() {
    this.getDevicesStatus();
    this.getServiceConfig();
    this.getAllDataCounts();

    const dismiss = JSON.parse(localStorage.getItem('notificationsDismiss'));
    if (dismiss) {
      if (new Date().getTime() - dismiss.time < 1000 * 60 * 60 * 24) {
        this.dismissNotifications = dismiss;
      }
    }
  }

  getDevicesStatus() {
    if (!this.isFinish && !this.isLoading) {
      this.isLoading = true;
      this.serviceService.getDevicesTelemetries(this.page).subscribe(devices => {
        if (devices.data.length === 0) {
          this.isFinish = true;
        }
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < devices.data.length; i++) {
          devices.data[i].fullYear = new Date(devices.data[i].date * 1000).getFullYear();
          const miliageString = devices.data[i].data.miliage.toString();
          devices.data[i].miliageString = miliageString.substring(0, miliageString.length - 4) + ' '
            + miliageString.substring(miliageString.length - 4, miliageString.length - 1);
        }
        this.devicesData.data = this.devicesData.data.concat(devices.data);
        this.page++;
        this.isLoading = false;
        if (document.documentElement.scrollHeight - window.innerHeight < 400 && !this.isFinish) {
          this.getDevicesStatus();
        }
      });
    }
  }

  getServiceConfig() {
    this.serviceService.getServiceConfig().subscribe(config => {
      this.serviceConfig = config.data.config;
    });
  }

  getAllDataCounts() {
    this.serviceService.getAllDataCounts().subscribe(counts => {
      this.allDataCounts = counts.data;
    });
  }

  findDataCount(key: string, status: number): any {
    return this.allDataCounts[key].find(el => {
      return el.statusId === status;
    });
  }

  getConfig(type: string, typeValue: string): number {
    let value: number;
    this.serviceConfig.forEach(config => {
      if (config.type === type) {
        value = config[typeValue];
      }
    });
    return value;
  }

  onChangeCheckbox(el, id: number) {
    if (el.checked) {
      this.activeDevices.push(id);
    } else {
      this.activeDevices = this.activeDevices.filter(order => {
        return order !== id;
      });
    }
  }

  countErrors(isLess: boolean, config: number, key: string) {
    if (isLess) {
      return this.devicesData.data.filter(device => {
        if (device.data) {
          return device.data[key] < config;
        } else {
          return false;
        }
      }).length;
    } else {
      return this.devicesData.data.filter(device => {
        if (device.data) {
          return device.data[key] > config;
        } else {
          return false;
        }
      }).length;
    }
  }

  changeFilter(key: string) {
    this.activeFilters[key] = !this.activeFilters[key];
    localStorage.setItem('notifications.activeFilters', JSON.stringify(this.activeFilters));
  }

  clearFilters(key: string = null) {
    // tslint:disable-next-line:forin
    for (const filterKey in this.activeFilters) {
      this.activeFilters[filterKey] = false;
    }
    if (key) {
      this.activeFilters[key] = true;
    }
    localStorage.setItem('notifications.activeFilters', JSON.stringify(this.activeFilters));
  }

  dismiss() {
    this.dismissNotifications = {
      time: new Date().getTime(),
      devices: this.activeDevices
    };
    localStorage.setItem('notificationsDismiss', JSON.stringify(this.dismissNotifications));
  }

  checkAll() {
    if (this.activeDevices.length !== this.devicesData.filteredData.length) {
      this.activeDevices = [];
      this.devicesData.filteredData.forEach(el => {
        this.activeDevices.push(el.id);
      });
    } else {
      this.activeDevices = [];
    }
  }

  getIsError(data: any) {
    return (data.TP > this.getConfig('TP', 'max')) ||
      (data.CL > this.getConfig('CL', 'max')) ||
      (data.OL > this.getConfig('OL', 'max')) ||
      (data.FL > this.getConfig('FL', 'max')) ||
      (data.BV < this.getConfig('BV', 'min'));
  }

  getErrorsCount() {
    let count = 0;
    this.devicesData.data.forEach(el => {
      if (el.data && this.getIsError(el.data)) {
        count++;
      }
    });
    return count;
  }

  getIsWarrantyError(device: Device): number {
    if (new Date().getTime() - device.date * 1000 > 1000 * 60 * 60 * 24 * 365 * 2) {
      return 2;
    } else if (new Date().getTime() - device.date * 1000 > 1000 * 60 * 60 * 24 * 365 * 1.5) {
      return 1;
    } else {
      return 0;
    }
  }

  getWarrantyCount(filter: number): number {
    return this.devicesData.data.filter(el => {
      return this.getIsWarrantyError(el) === filter;
    }).length;
  }

  getIsDataUpdateError(device: Device): boolean {
    return new Date().getTime() - new Date(device.data.created_at).getTime() > 1000 * 60 * 60 * 5;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop < 400 + window.innerHeight) {
      this.getDevicesStatus();
    }
  }
}
