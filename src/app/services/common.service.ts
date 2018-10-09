import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

    constructor(private http: HttpClient) {
    }

    getData(): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/posts?userId=1')
        .pipe(
            map((data: any) => {
                return data;
            })
        );
    }
}
