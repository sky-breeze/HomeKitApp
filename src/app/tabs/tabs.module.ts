import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { AuthPageModule } from '../auth/auth.module';
import { ApplianceService } from '../services/appliance/appliance.service';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../services/news/news.service';
import { CommmonService } from '../services/shared/commmon.service';
import { StorageService } from '../services/storage/storage.service';
import { DatetimeService } from '../services/datetime/datetime.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
// import { GaugeChartModule } from 'angular-gauge-chart'


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    AuthPageModule,
    HttpClientModule,





  ],
  declarations: [TabsPage,],
  providers: [
    ApplianceService,
    NewsService,
    CommmonService,
    StorageService,
    DatetimeService,
    FilePath,
    FileChooser,
    Base64,
    Chooser

  ]
})
export class TabsPageModule { }
