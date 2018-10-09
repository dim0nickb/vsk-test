import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

export interface VSKData {
    userId: number;
    id: number;
    title: string;
    body: string;
}
@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

    dataSource: VSKData[] = undefined;
    displayedColumns: string[] = ['userId', 'id', 'title', 'body'];

    constructor(private commonService: CommonService) {
    }

    ngOnInit(): void {
        this.commonService.getData()
        .subscribe((data: any) => {
            console.log(data);
            this.dataSource = data as VSKData[];
        });
    }
}
