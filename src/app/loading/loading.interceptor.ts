import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { finalize } from "rxjs";
import { LoadingService } from "./loading.service";
import { inject } from "@angular/core";

export const loadingInterceptor: HttpInterceptorFn =
    (request: HttpRequest<unknown>, next: HttpHandlerFn) => {

        // inject loading-service
        const loadingService = inject(LoadingService);
        // let the loading be ON before any http request get triggered
        loadingService.loadingOn();
        // handle http request  
        return next(request).pipe(
            finalize(() => {
                // let the loading off after the http request get completed.
                loadingService.loadingOff();
            }
            )
        )
    }
    // note: finalize operator processes the data after the observables get completed that were in the execution