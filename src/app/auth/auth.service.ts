import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TokenManager} from "./jwt/TokenManager";
import {IUser} from "./IUser";
import {IJwtModel} from "./jwt/IJwtModel";
import {environment} from "../../environments/environment";
import {ILogin} from "./ILogin";

export const defaultPath = '/';
const defaultUser = {
    email: 'natiqmustafa',
    avatarUrl: '../../../../assets/nophoto.jpg'
};

const BACKEND_URL = environment.apiUrl;

@Injectable()
export class AuthService {
    private readonly LOGIN_PATH = BACKEND_URL + "/auth/login";
    private _lastAuthenticatedPath = new BehaviorSubject<string>("");
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    public _currentPath$ = new BehaviorSubject<string>(this._lastAuthenticatedPath.getValue())
    isLoggedIn$ = this._isLoggedIn$.asObservable();

    private _user: IUser | null = defaultUser;


    constructor(private router: Router,
                private tokenManager: TokenManager,
                private httpClient: HttpClient) {
        this.loadTokenFromStorage();
    }

    get IsLoggedIn() {
        return this._isLoggedIn$.getValue();
    }


    get currentPath() {
        return this._currentPath$.getValue();
    }


    login(login: ILogin) {
        return this.httpClient.post<IJwtModel>(this.LOGIN_PATH, login).pipe(
            tap((response: IJwtModel) => {
                this._isLoggedIn$.next(true);
                this.tokenManager.jwtModel = response;
                this.tokenManager.init();
            })
        );
    }

    logOut() {
        this.tokenManager.clearStorage();
        this._isLoggedIn$.next(false);
        this.router.navigate(['/login-form']).then(r => console.log(r));
    }

    private loadTokenFromStorage(): void {
        this._isLoggedIn$.next(!!this.tokenManager.token);
    }


    getLastAuthPathData() {
        return this._lastAuthenticatedPath.asObservable();
    }

    updateLastAuth(value: string) {
        return this._lastAuthenticatedPath.next(value);
    }

    getCurrentLastAuth() {
        return this._lastAuthenticatedPath.getValue();
    }


    public hasAccess(roles: Array<string>): boolean {
        const userRoles = this.tokenManager.roles;
        if (!userRoles || userRoles.length === 0)
            return false;
        if (!roles || roles.length === 0)
            return false;
        return userRoles.some(e => roles.includes(e));
    }

    getUser(): IUser {
        return {
            email: this.tokenManager.username,
            avatarUrl: defaultUser.avatarUrl
        } as IUser
    };


    getPathData() {
        return this._currentPath$.asObservable();
    }

    updatePathData(value: string) {
        return this._currentPath$.next(value);
    }

    getCurrentPathInfo() {
        return this._currentPath$.getValue();
    }

    // async getUser() {
    //   try {
    //     return {
    //       isOk: true,
    //       data: {
    //         email: this.tokenManager.getUserNameFromToken(),
    //         avatarUrl: defaultUser.avatarUrl
    //       } as IUser
    //     };
    //   } catch {
    //     return {
    //       isOk: false,
    //       data: null
    //     };
    //   }
    // }
}


