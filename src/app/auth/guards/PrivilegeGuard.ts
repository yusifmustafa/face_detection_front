import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PrivilegeGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const privileges = JSON.parse(localStorage.getItem('priviligies') || '[]');
        const requiredPrivilege = route.data['requiredPrivilege'];
        if (requiredPrivilege && !privileges.includes(requiredPrivilege)) {
            this.router.navigate(['/home']);
            return false;
        }


        return true;
    }
}
