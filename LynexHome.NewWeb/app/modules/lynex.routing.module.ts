import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlComponent } from '../components/control.component';
import { SiteManagerComponent } from '../components/sitemanager.component';
import { AccountComponent } from '../components/account.component';


const routes: Routes = [
    { path: '', redirectTo: '/control', pathMatch: 'full' },
    { path: 'control', component: ControlComponent },
    { path: 'sitemanager', component: SiteManagerComponent },
    { path: 'account', component: AccountComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class LynexRoutingModule { }
