import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/gaurds/auth.guard';
import { HomeGuard } from '../auth/gaurds/home.guard';
import { IndexGuard } from '../auth/gaurds/index.guard';
import { UserDataResolver } from '../auth/resolver/user-data.resolver';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [HomeGuard],
    resolve: {
      userData: UserDataResolver
    },
    children: [
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('./Pages/account/account.module').then(m => m.AccountPageModule)
          }
        ]
      },
      {
        path: 'home',
        // canActivate: [HomeGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('./Pages/home/home.module').then(m => m.HomePageModule)
          }
        ]

      },
      {
        path: 'news-feed',
        children: [
          {
            path: '',
            loadChildren: () => import('./Pages/news-feed/news-feed.module').then(m => m.NewsFeedPageModule)
          }
        ]

      },
      {
        path: 'appliance',
        // canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('./Pages/appliance/appliance.module').then(m => m.AppliancePageModule)
          }
        ]

      },
      {
        path: 'scan-document',
        // canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () => import('./Pages/scan-document/scan-document.module').then(m => m.ScanDocumentPageModule)
          }
        ]

      },
      {
        path: 'add-appliance',
        children: [
          {
            path: '',
            loadChildren: () => import('./Pages/add-appliance/add-appliance.module').then(m => m.AddAppliancePageModule)
          }
        ]

      },
      {
        path: 'editAppliance/:appliance',
        children: [
          {
            path: '',
            loadChildren: () => import('./Pages/add-appliance/add-appliance.module').then(m => m.AddAppliancePageModule)
          }
        ]

      },
      {
        path: 'performance',
        children: [
          {
            path: '',
            loadChildren: () => import('./Pages/performance/performance.module').then(m => m.PerformancePageModule)
          }
        ]
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-sensor',
    loadChildren: () => import('./Pages/add-sensor/add-sensor.module').then(m => m.AddSensorPageModule)
  },
  {
    path: 'sensor',
    loadChildren: () => import('./Pages/sensor/sensor.module').then(m => m.SensorPageModule)
  },






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
