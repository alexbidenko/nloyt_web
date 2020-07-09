import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeftBarComponent} from '../ui/left-bar/left-bar.component';
import {ConfirmDialogComponent} from '../ui/modals/confirm-dialog/confirm-dialog.component';
import {ResultDialogComponent} from '../ui/modals/result-dialog/result-dialog.component';
import {LangDialogComponent} from '../ui/modals/lang-dialog/lang-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatNativeDateModule, MatRadioModule,
  MatRippleModule, MatSelectModule,
  MatTableModule
} from '@angular/material';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TopBarComponent} from '../ui/top-bar/top-bar.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ResultDialogComponent,
    LangDialogComponent,
    LeftBarComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient]
      }
    }),
    MatRadioModule,
    NgxMaterialTimepickerModule
  ],
  exports: [
    LeftBarComponent,
    ConfirmDialogComponent,
    ResultDialogComponent,
    LangDialogComponent,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    NgxMaterialTimepickerModule,
    TopBarComponent
  ],
})
export class SharedModule { }
