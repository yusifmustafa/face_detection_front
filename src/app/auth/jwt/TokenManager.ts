import {Injectable} from "@angular/core";
import {jwtDecode} from "jwt-decode";
import {IJwtModel} from "./IJwtModel";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class TokenManager {

    private readonly LS_ROLES = "ROLES";
    private readonly LS_TOKEN = "TOKEN";
    private readonly LS_REFRESH_TOKEN = 'REFRESH-TOKEN';
    private readonly LS_USERNAME = "username";
    private readonly LS_USER_ID = "userId";
    private readonly LS_PRIVILEGES = 'priviligies';
    private readonly LS_FILE_ID = 'fileId';
    private _jwtModel: IJwtModel = {} as IJwtModel;

    private BACKEND_URL = environment.apiUrl;

    constructor() {
        // this.subscribeToken();
        this.startTokenExpirationCheck();
    }

    set jwtModel(value: IJwtModel) {
        this._jwtModel = value;
    }

    public init(): void {
        this.token = this._jwtModel.token;
        this.refresh_Token = this._jwtModel.refreshToken;
        this.roles = this._jwtModel.roles;
        this.username = this._jwtModel.username;
        this.userId = this._jwtModel.id;
        this.privileges = this._jwtModel.priviligies;
        this.fileId = this._jwtModel.fileId;
        // this._jwtModel$.next(this._jwtModel);
    }

    get jwtModel(): IJwtModel {
        return this._jwtModel;
    }


    set fileId(value: any) {
        localStorage.setItem(this.LS_FILE_ID, value);
    }

    get fileId(): any {
        const fileId = localStorage.getItem(this.LS_FILE_ID);
        if (!fileId) {
            return null;
        }
        return fileId;
    }

    set username(value: string) {
        localStorage.setItem(this.LS_USERNAME, value);
    }


    get username(): string | null {
        const username = localStorage.getItem(this.LS_USERNAME);
        if (!username) {
            return null;
        }
        return username;
    }

    set userId(value: any) {
        localStorage.setItem(this.LS_USER_ID, value);
    }

    get userId(): any | null {
        const userId = localStorage.getItem(this.LS_USER_ID);
        if (!userId) {
            return null;
        }
        return userId;
    }


    set token(value: string) {
        localStorage.setItem(this.LS_TOKEN, value);
    }

    set refresh_Token(value: string) {
        localStorage.setItem(this.LS_REFRESH_TOKEN, value);
    }


    get token(): string | null {
        const token = localStorage.getItem(this.LS_TOKEN);
        if (!token) {
            return null;
        }
        return token;
    }

    get refreshTokenValue(): string | null {
        const refreshToken = localStorage.getItem(this.LS_REFRESH_TOKEN);
        if (!refreshToken) {
            return null;
        }
        return refreshToken;
    }

    get privileges(): [] {
        const privileges = localStorage.getItem(this.LS_PRIVILEGES);
        if (privileges) {
            return JSON.parse(privileges);
        }
        return [];
    }

    set privileges(privileges: Array<string>) {
        localStorage.setItem(this.LS_PRIVILEGES, JSON.stringify(privileges));
    }

    get roles(): [] {
        const roles = localStorage.getItem(this.LS_ROLES);
        if (roles)
            return JSON.parse(roles);
        return [];
    }

    set roles(roles: Array<string>) {
        localStorage.setItem(this.LS_ROLES, JSON.stringify(roles));
    }


    public clearStorage(): void {
        localStorage.clear();
    }


    private startTokenExpirationCheck(): void {
        setInterval(() => {
            const token = this.token;
            if (token) {
                const decoded: IJwtModel = jwtDecode(token);
                const expirationDate = decoded.exp * 1000;
                const timeLeft = expirationDate - Date.now();

                if (timeLeft <= 60000) {
                    this.refreshToken().catch(error => {
                        console.error("Token refresh failed:", error);
                        this.clearStorage();
                    });
                }
            }
        }, 30000);
    }

    refreshToken(): Promise<string | null> {
        const refreshToken = this.refreshTokenValue;
        if (!refreshToken) {
            return Promise.resolve(null);
        }

        return fetch(`${this.BACKEND_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'refreshToken': `${refreshToken}`
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Token refresh failed");
            })
            .then(data => {
                console.log('token data', data);
                if (data && data.token && data.refreshToken) {
                    this.token = data.token;
                    this.refresh_Token = data.refreshToken;
                    return data.token;
                }
                throw new Error("Invalid refresh token response");
            })
            .catch(error => {
                console.error("Refresh Token Error:", error);
                this.clearStorage();
                return null;
            });
    }


}
