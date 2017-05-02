import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LynexRoutingModule } from './lynex.routing.module';

import { LynexComponent } from '../components/lynex.component';
import { NavigationComponent } from '../components/navigation.component';
import { LoginComponent } from '../components/login.component';
import { FooterComponent } from '../components/footer.component';
import { ControlComponent } from '../components/control.component';

import { ApiService } from '../services/api.service';
import { SwitchService } from '../services/switch.service';
import { UserService } from '../services/user.service';
import { WebSocketService } from '../services/websocket.service';
import { SiteWebSocketService } from '../services/sitewebsocket.service';

@NgModule({
    imports: [BrowserModule, NgbModule.forRoot(), HttpModule, FormsModule, LynexRoutingModule],
    declarations: [LynexComponent, NavigationComponent, LoginComponent, FooterComponent, ControlComponent],
    providers: [ApiService, SwitchService, UserService, WebSocketService, SiteWebSocketService],
    bootstrap: [LynexComponent]
})
export class LynexModule { }
