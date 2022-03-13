import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/gaurds/auth.guard';
import { HomeGuard } from './auth/gaurds/home.guard';
import { UserDataResolver } from './auth/resolver/user-data.resolver';

const routes: Routes = [
  {
    path: 'tabs',
    // canActivate: [HomeGuard],
    // resolve: {
    //   userData: UserDataResolver
    // },
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./components/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./components/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
}
 
 
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
