import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { LynexRoutingModule } from './lynex.routing.module';
import { MomentModule } from 'angular2-moment';

import { LynexComponent } from '../components/lynex.component';
import { DialogComponent } from '../components/dialog.component';
import { NavigationComponent } from '../components/navigation.component';
import { LoginComponent } from '../components/login.component';
import { FooterComponent } from '../components/footer.component';
import { ControlComponent } from '../components/control.component';
import { ScheduleComponent } from '../components/schedule.component';
import { SwitchSettingComponent } from '../components/switchsetting.component';
import { SiteManagerComponent } from '../components/sitemanager.component';
import { AccountComponent } from '../components/account.component';

import { ApiService } from '../services/api.service';
import { SwitchService } from '../services/switch.service';
import { SiteService } from '../services/site.service';
import { UserService } from '../services/user.service';
import { SettingsService } from '../services/settings.service';
import { WebConfig } from '../models/webconfig.model';


@NgModule({
    imports: [BrowserModule, NgbModule.forRoot(), HttpModule, FormsModule, LynexRoutingModule, DndModule.forRoot(), MomentModule, ReactiveFormsModule],
    declarations: [LynexComponent, DialogComponent, NavigationComponent, LoginComponent, FooterComponent, ControlComponent, ScheduleComponent, SwitchSettingComponent, SiteManagerComponent, AccountComponent],
    providers: [UserService, ApiService, SwitchService, , SiteService, SettingsService, FormBuilder],
    bootstrap: [LynexComponent]
})
export class LynexModule { }


