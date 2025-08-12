// import {inject, Injectable} from "@angular/core";
// import {interval, Subject, Subscription} from "rxjs";
// import {AuthService} from "./auth.service";
//
// @Injectable({
//     providedIn: 'root'
// })
// export class IdleService {
//     private idleSubject = new Subject<boolean>();
//     private timeOut = 600;
//     private lastActivity: Date = new Date();
//     private idleCheckInterval = 10;
//     private idleSubscription?: Subscription;
//     private authService = inject(AuthService);
//
//     constructor() {
//         this.startWatching();
//         this.resetTimer();
//         this.listenUserEvents();
//     }
//
//
//     private startWatching() {
//         this.idleSubscription = interval(this.idleCheckInterval * 1000).subscribe(() => {
//             const now = new Date();
//             const lastActivityTime = this.lastActivity ? this.lastActivity.getTime() : new Date().getTime();
//             const timeDiff = (now.getTime() - lastActivityTime) / 1000;
//
//             console.log(`⏳ Hərəkətsiz qalma müddəti: ${timeDiff} saniye`);
//
//             if (timeDiff > this.timeOut) {
//                 console.log('İstifadəçi hərəkətsizdir, logout edilir!');
//                 this.idleSubject.next(true);
//                 this.authService.logOut();
//             }
//         });
//     }
//
//     private listenUserEvents() {
//         window.addEventListener('mousemove', () => this.resetTimer());
//         window.addEventListener('keydown', () => this.resetTimer());
//         window.addEventListener('click', () => this.resetTimer());
//     }
//
//     resetTimer() {
//         this.lastActivity = new Date();
//         this.idleSubject.next(false);
//         console.log("✅ User aktiv oldu, vaxt limiti sıfırlandı.");
//     }
//
//
//     getIdleStatus() {
//         return this.idleSubject.asObservable();
//     }
// }
