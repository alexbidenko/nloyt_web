import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {

  address = {
    country: JSON.parse(localStorage.getItem('userData')).country,
    state: '',
    city: '',
    addressLine: '',
    ZIP: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    if (this.data.startValue) {
      this.address = this.data.startValue;
    }
  }

  close(withSave: boolean = false) {
    if (withSave) {
      this.data.onClose(this.address);
    }
    this.dialogRef.close();
  }
}
