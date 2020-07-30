import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class TableService {
    private httpClient;
    constructor(httpClient: HttpClient);
    patchHero(url: any, params: any): Observable<{}>;
}
