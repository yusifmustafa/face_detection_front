import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, from, Observable, switchMap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {TokenManager} from "./jwt/TokenManager";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationService} from "../notification-service/notification.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private tokenManager: TokenManager,
                private notificationService: NotificationService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get("No_Auth") === 'True') {
            return next.handle(req.clone());
        }

        const token = this.tokenManager.token;

        if (token) {
            req = this.addToken(req, token);
        }

        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.notificationService.showError(err.message);
                    return from(this.tokenManager.refreshToken()).pipe(
                        switchMap(newToken => {
                            if (newToken) {
                                const clonedRequest = this.addToken(req, newToken);
                                return next.handle(clonedRequest);
                            } else {
                                this.handleAuthError();
                                return throwError(() => err);
                            }
                        }),
                        catchError(refreshError => {
                            this.handleAuthError();
                            return throwError(() => refreshError);
                        })
                    );
                } else if (err.status === 403) {
                    this.handleAuthError();
                    this.router.navigate(['/forbidden']);
                    window.location.reload();
                }
                return throwError(() => err);
            })
        );
    }

    private handleAuthError() {
        this.tokenManager.clearStorage();
        this.router.navigate(['/login-form']);
    }

    addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
