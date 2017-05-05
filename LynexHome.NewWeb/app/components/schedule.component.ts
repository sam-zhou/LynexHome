import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


@Component({
    selector: 'schedule',
    templateUrl: 'views/schedule.component.html',
    styleUrls: [ 'css/schedule.component.css'],
    moduleId: module.id
})
export class ScheduleComponent implements OnInit {
    

    ngOnInit(): void {
        
    }
}
