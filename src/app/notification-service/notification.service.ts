import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) {}

    showError(message: string, duration: number = 3000) {
        this.snackBar.open(message, 'Bağla', {
            duration,
            panelClass: ['snackbar-error']
        });
    }

    showSuccess(message: string, duration: number = 3000) {
        this.snackBar.open(message, 'OK', {
            duration,
            panelClass: ['snackbar-success']
        });
    }
}
