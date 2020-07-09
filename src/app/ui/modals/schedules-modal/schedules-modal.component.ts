import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NgxMaterialTimepickerComponent} from 'ngx-material-timepicker';
import {AppService} from '../../../services/app.service';

@Component({
  selector: 'app-schedules-modal',
  templateUrl: './schedules-modal.component.html',
  styleUrls: ['./schedules-modal.component.scss']
})
export class SchedulesModalComponent implements OnInit {

  @ViewChild('timePicker', null) timePicker: NgxMaterialTimepickerComponent;
  days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  timeSchedules = {
    timezoneOffset: new Date().getTimezoneOffset() / -60,
    schedules: {
      mon: {start: null, end: null},
      tue: {start: null, end: null},
      wed: {start: null, end: null},
      thu: {start: null, end: null},
      fri: {start: null, end: null},
      sat: {start: null, end: null},
      sun: {start: null, end: null}
    }
  };
  private which = 'start';
  private day = 'mon';

  constructor(
    public dialogRef: MatDialogRef<SchedulesModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    if (this.data.startValue) {
      this.timeSchedules = this.data.startValue;
    }
  }

  onSetTime(newTime: string) {
    this.timeSchedules.schedules[this.day][this.which] = newTime;
  }

  openPicker(which: string, day: string) {
    this.which = which;
    this.day = day;
    this.timeSchedules.schedules[this.day][this.which] = null;
    this.timePicker.open();
  }

  close(withSave: boolean = false) {
    if (withSave) {
      for (const day in this.timeSchedules.schedules) {
        if (!this.timeSchedules.schedules[day].start || !this.timeSchedules.schedules[day].end) {
          this.timeSchedules.schedules[day] = {
            start: null,
            end: null
          };
        }
      }
      this.data.onClose(this.timeSchedules);
    }
    this.dialogRef.close();
  }

  getFormat(): number {
    if (AppService.getLang() === 'ru-Ru') {
      return 24;
    } else {
      return 12;
    }
  }
}
