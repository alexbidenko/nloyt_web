import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RequestService} from '../request/request.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  orderId: number;
  receiptUrlData: string;

  constructor(
    private route: ActivatedRoute,
    @Inject('BASE_URL') public baseUrl: string,
    public requestService: RequestService
  ) { }

  ngOnInit() {
    this.orderId = +this.route.snapshot.paramMap.get('orderId');
    this.requestService.getReceipt(this.orderId).subscribe(receipt => {
      this.receiptUrlData = URL.createObjectURL(receipt);
      console.log(this.receiptUrlData);
    });
  }

}
