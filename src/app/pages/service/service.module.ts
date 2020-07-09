import { NgModule } from '@angular/core';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import {OrdersComponent} from './orders/orders.component';
import {RequestComponent} from './request/request.component';
import {StatusComponent} from '../../ui/status/status.component';
import {VehicleComponent} from './request/vehicle/vehicle.component';
import {ServicesComponent} from './request/services/services.component';
import {CustomerComponent} from './request/customer/customer.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {DownloadListDialogComponent} from '../../ui/modals/download-list-dialog/download-list-dialog.component';
import {ReceiptComponent} from './receipt/receipt.component';
import {SafePipe} from '../../pipes/SafePipe';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {HttpClient} from '@angular/common/http';


@NgModule({
  declarations: [
    ServiceComponent,
    ReceiptComponent,
    SafePipe,
    OrdersComponent,
    ServiceComponent,
    RequestComponent,
    StatusComponent,
    VehicleComponent,
    ServicesComponent,
    CustomerComponent,
    NotificationsComponent,
    DownloadListDialogComponent,
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ]
})
export class ServiceModule { }
