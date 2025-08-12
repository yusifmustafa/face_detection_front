import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {tap} from "rxjs";
import {inject} from "@angular/core";
import {AuthService, defaultPath} from "../auth.service";

export const IsNotAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return !authService.IsLoggedIn;
}
