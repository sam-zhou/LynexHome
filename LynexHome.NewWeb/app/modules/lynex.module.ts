import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LynexComponent } from '../components/lynex.component';
import { NavigationComponent } from '../components/navigation.component';
import { LoginComponent } from '../components/login.component';
import { FooterComponent } from '../components/footer.component';
import { ControlComponent } from '../components/control.component';

import { ApiService } from '../services/api.service';
import { SwitchService } from '../services/switch.service';

@NgModule({
    imports: [BrowserModule, NgbModule.forRoot(), HttpModule],
    declarations: [LynexComponent, NavigationComponent, LoginComponent, FooterComponent, ControlComponent],
    providers: [ApiService, SwitchService],
    bootstrap: [LynexComponent, NavigationComponent, LoginComponent, FooterComponent, ControlComponent]
})
export class LynexModule { }
