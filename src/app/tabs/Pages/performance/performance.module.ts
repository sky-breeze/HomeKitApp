import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerformancePageRoutingModule } from './performance-routing.module';

import { PerformancePage } from './performance.page';
import { GaugeChartModule } from 'angular-gauge-chart';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerformancePageRoutingModule,
    GaugeChartModule,
    ReactiveFormsModule




  ],
  declarations: [PerformancePage]
})
export class PerformancePageModule { }
