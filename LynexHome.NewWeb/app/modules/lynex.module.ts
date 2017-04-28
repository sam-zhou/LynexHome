import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LynexComponent } from '..//components/lynex.component';
import { NavigationComponent } from '..//components/navigation.component';
import { LoginComponent } from '..//components/login.component';
import { FooterComponent } from '..//components/footer.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [LynexComponent, NavigationComponent, LoginComponent, FooterComponent],
    bootstrap: [LynexComponent, NavigationComponent, LoginComponent, FooterComponent]
})
export class LynexModule { }
