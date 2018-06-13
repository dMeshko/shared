import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { IqLoadingService } from "./iq-loading.service";

@Injectable()
export class IqLoadingHttpInterceptor implements HttpInterceptor {
    private pendingRequests: number = 0;
    
constructor(private loadingService: IqLoadingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.pendingRequests++;
        if (1 === this.pendingRequests) {
            this.loadingService.show();
        }

        return next.handle(req).pipe(
            map(event => {
                return event;
            }),
            catchError(error => {
                this.pendingRequests--;
                return throwError(error);
            }),
            finalize(() => {
                    this.pendingRequests--;

                    if (0 === this.pendingRequests) {
                        this.loadingService.hide();
                    }
            })
        );
    }
}
