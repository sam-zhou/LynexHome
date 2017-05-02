import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ControlComponent } from '../components/control.component';



const routes: Routes = [
    { path: '', redirectTo: '/control', pathMatch: 'full' },
    { path: 'control', component: ControlComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LynexRoutingModule { }
