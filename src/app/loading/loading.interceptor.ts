import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { finalize } from "rxjs";
import { LoadingService } from "./loading.service";
import { inject } from "@angular/core";
import { SkipLoading } from "./skip-loading.component";

export const loadingInterceptor: HttpInterceptorFn =
    (request: HttpRequest<unknown>, next: HttpHandlerFn) => {

        // skip - loading for a specific use-case
        // check if the SkipLoading httpContext token existence in the request 
        // and if present, proceed handling the request. skips showing the spinner
        if( request.context.get(SkipLoading)){
            return next(request)
        }

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