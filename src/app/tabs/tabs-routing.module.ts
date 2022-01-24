import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'mail',
        loadChildren: () => import('../pages/mail/mail.module').then(m => m.MailPageModule),
      },
      {
        path: 'mail/:id',
        loadChildren: () => import('../pages/details/details.module').then(m => m.DetailsPageModule),
      },
      {
        path: 'meet',
        loadChildren: () => import('../pages/meet/meet.module').then(m => m.MeetPageModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
