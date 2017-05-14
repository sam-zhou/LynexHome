import { Component, Directive, OnInit, Input } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { SiteService } from '../services/site.service';
import { Site } from '../models/site.model';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'sitemanager',
    templateUrl: 'views/sitemanager.component.html',
    styleUrls: [ 'css/sitemanager.component.css'],
    moduleId: module.id
})
export class SiteManagerComponent implements OnInit {
    sites: Site[] = [];

    isBusy: boolean = true;

    selectedSite: Site = null;

    isMenuSelected: boolean = false;

    siteForm: FormGroup;

    constructor(private siteService: SiteService, private formBuilder: FormBuilder) {
        
    }

    save(): void {
        this.isBusy = true;
        let siteModel = {
            Name: this.siteForm.get("name").value,
            Address: this.siteForm.get("address").value,
            Suburb: this.siteForm.get("suburb").value,
            State: this.siteForm.get("state").value,
            Postcode: this.siteForm.get("postcode").value,
            Country: this.siteForm.get("country").value
        }

        this.siteService.updateSite(siteModel).then(results => {
            this.isBusy = true;
        });
    }

    selectSite(site: Site): void {
        this.isBusy = true;
        this.selectedSite = site;
        this.loadSelectedSite();
        this.isMenuSelected = true;
    }

    loadSelectedSite(): void {
        
        this.siteForm = this.formBuilder.group({
            'name': [this.selectedSite.name, [
                Validators.required,
                Validators.maxLength(20),
            ]
            ],
            'address': [this.selectedSite.address, [
                Validators.required,
                Validators.maxLength(50),
            ]
            ],
            'suburb': [this.selectedSite.suburb, [
                Validators.required,
                Validators.maxLength(20),
            ]
            ],
            'state': [this.selectedSite.state, [
                Validators.required,
                Validators.maxLength(20),
            ]
            ],
            'postcode': [this.selectedSite.postcode, [
                Validators.required,
                Validators.maxLength(4),
            ]
            ],
            'country': [this.selectedSite.country, [
                Validators.required,
                Validators.maxLength(20),
            ]
            ],
        });
        this.isBusy = false;
    }

    setDefault(): void {
        if (this.selectedSite) {
            this.isBusy = true;
            this.siteService.setDefault(this.selectedSite.id).then(response => {
                if (response.success) {
                    for (let i = 0; i < this.sites.length; i++) {
                        if (this.sites[i].id === this.selectedSite.id) {
                            this.sites[i].isDefault = true;
                        } else {
                            this.sites[i].isDefault = false;
                        }
                    }
                }

                this.isBusy = false;
            });
        }
    }


    ngOnInit(): void {
        let self = this;


        this.siteService.getSites().then(sites => {
            this.sites = sites;
            console.log(sites);
            for (let i = 0; i < this.sites.length; i++) {
                if (this.sites[i].isDefault) {
                    this.selectedSite = this.sites[i];
                    
                    this.loadSelectedSite();
                    break;
                }
            }
        });

        
    }

}
