import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {tap} from "rxjs";
import {inject} from "@angular/core";
import {AuthService, defaultPath} from "../auth.service";

export const IsAuthenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isAuthForm = [
    'login-form'
  ].includes(route.routeConfig?.path || defaultPath);

  return authService.isLoggedIn$.pipe(
    tap((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        router.navigate(['/login-form']);
      }
    })
  );
}
