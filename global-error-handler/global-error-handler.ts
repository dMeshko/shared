import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {}

    handleError(error: any): void {
        const toastr = this.injector.get(ToastrService);
        toastr.error(error.message || "error");

        // re-throw the error?
        //throw error;
    }
}
