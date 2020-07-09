import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LangDialogComponent} from '../../ui/modals/lang-dialog/lang-dialog.component';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  currentLang: string;

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.currentLang = AppService.getLang();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  changeLang() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(LangDialogComponent, dialogConfig);
  }
}
