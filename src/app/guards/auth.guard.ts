import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

/**
 * Checks if the user is authenticated before allowing access to a route.
 * If the user is not authenticated, it redirects to the login page.
 *
 * @param route - The activated route snapshot.
 * @param state - The router state snapshot.
 * @returns A boolean indicating whether the user is authenticated or not.
 *          If the user is authenticated, it returns `true`.
 *          If the user is not authenticated, it returns a `UrlTree` object representing the login page URL.
 */
export const isUserAuthenticated: CanActivateFn =  
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

        const authService = inject(AuthService)
        const router = inject(Router)
        
        return authService.isLoggedIn() ? true : router.parseUrl('/login');
    }