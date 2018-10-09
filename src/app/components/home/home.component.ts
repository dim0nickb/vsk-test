import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    options: FormGroup;

    contractNumber = '';

    constructor(fb: FormBuilder,
        private router: Router) {
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
        });
    }

    process() {
        
            this.router.navigate(['/results']);

    }
}
