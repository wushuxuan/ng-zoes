import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
let TableService = class TableService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    patchHero(url, params) {
        return this.httpClient.request('GET', url, params);
    }
};
TableService.ɵprov = i0.ɵɵdefineInjectable({ factory: function TableService_Factory() { return new TableService(i0.ɵɵinject(i1.HttpClient)); }, token: TableService, providedIn: "root" });
TableService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TableService);
export { TableService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXpvZXMvbGliL2NvbXBvbmVudHMvdGFibGUvdGFibGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUTNDLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFFdkIsWUFDVSxVQUFxQjtRQUFyQixlQUFVLEdBQVYsVUFBVSxDQUFXO0lBRTNCLENBQUM7SUFFTCxTQUFTLENBQUMsR0FBRyxFQUFDLE1BQU07UUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRixDQUFBOztBQVZZLFlBQVk7SUFIeEIsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLFlBQVksQ0FVeEI7U0FWWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJsZVNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cENsaWVudDpIdHRwQ2xpZW50LFxyXG5cclxuICApIHsgfVxyXG5cclxuICBwYXRjaEhlcm8odXJsLHBhcmFtcyk6IE9ic2VydmFibGU8e30+IHtcclxuICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5yZXF1ZXN0KCdHRVQnLCB1cmwsIHBhcmFtcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==