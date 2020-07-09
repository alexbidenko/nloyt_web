import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ServiceService} from '../../services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  service = JSON.parse(localStorage.getItem('service'));

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private serviceService: ServiceService
  ) {
    if (!localStorage.getItem('userToken')) {
      this.router.navigateByUrl('/').then();
    }
  }

  ngOnInit() {
    this.serviceService.getServiceConfig().subscribe(config => {
      this.serviceService.isBusy = config.data.isBusy;
      this.serviceService.activeOrdersCount = config.data.activeOrdersCount;
      this.serviceService.ordersCount = config.data.ordersCount;
    });

    this.serviceService.channel.bind('service-is-busy-' + this.service.id, data => {
      this.serviceService.isBusy = data.isBusy;
      this.serviceService.activeOrdersCount = data.activeOrdersCount;
    });
  }
}
