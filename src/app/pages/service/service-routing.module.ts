import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceComponent } from './service.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {OrdersComponent} from './orders/orders.component';
import {RequestComponent} from './request/request.component';
import {ServicesComponent} from './request/services/services.component';
import {VehicleComponent} from './request/vehicle/vehicle.component';
import {CustomerComponent} from './request/customer/customer.component';
import {ReceiptComponent} from './receipt/receipt.component';

const routes: Routes = [{ path: '', component: ServiceComponent,
  children: [
    { path: 'notifications', component: NotificationsComponent },
    { path: 'orders', component: OrdersComponent},
    { path: 'orders/:orderId/request', component: RequestComponent,
      children: [
        { path: '', redirectTo: 'services', pathMatch: 'full' },
        { path: 'services', component: ServicesComponent},
        { path: 'vehicle', component: VehicleComponent },
        { path: 'customer', component: CustomerComponent }
      ]
    },
    { path: 'orders/:orderId/receipt', component: ReceiptComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
