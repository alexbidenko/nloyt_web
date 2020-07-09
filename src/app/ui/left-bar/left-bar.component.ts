import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LangDialogComponent} from '../modals/lang-dialog/lang-dialog.component';
import {Employee} from '../../models/interfaces';
import {ServiceService} from '../../services/service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {

  user: Employee = JSON.parse(localStorage.getItem('userData'));
  isOpenLeftBar = false;

  constructor(
    private dialog: MatDialog,
    @Inject('BASE_URL') private baseUrl: string,
    public serviceService: ServiceService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  toggleBar() {
    if (this.isOpenLeftBar) {
      this.isOpenLeftBar = false;
      document.getElementById('main-container').style.paddingLeft = '68px';
    } else {
      this.isOpenLeftBar = true;
      document.getElementById('main-container').style.paddingLeft = '254px';
    }
  }

  getAvatar(type: string): string {
    if (type === 'image') {
      return this.user.photo ?
        this.baseUrl + '/images/employee/' + this.user.photo : '';
    }
    return this.user.fullName ? this.user.fullName.split(' ').map(name => name.substring(0, 1).toUpperCase()).join('') :
      (this.user.firstName ? this.user.firstName.substring(0, 1).toUpperCase() : '') +
      (this.user.lastName ? this.user.lastName.substring(0, 1).toUpperCase() : '');
  }

  changeLang() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(LangDialogComponent, dialogConfig);
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('service');
    this.router.navigateByUrl('/').then();
  }
}
