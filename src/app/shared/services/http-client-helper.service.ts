import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpClientHelperService {

    private defaultHeaders = new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    });

    constructor(private http: HttpClient) {
    }

    get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
        return this.http.get<T>(url, {
            headers: headers || this.defaultHeaders,
            params
        });
    }

    getById<T>(url: string, id: string | number, headers?: HttpHeaders): Observable<T> {
        return this.http.get<T>(`${url}/${id}`, {
            headers: headers || this.defaultHeaders
        });
    }

    post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(url, body, {
            headers: headers || this.defaultHeaders
        });
    }

    put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.put<T>(url, body, {
            headers: headers || this.defaultHeaders
        });
    }

    delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
        return this.http.delete<T>(url, {
            headers: headers || this.defaultHeaders
        });
    }

    uploadSingleFile<T>(url: string, file: File, extraData?: Record<string, any>): Observable<T> {
        const formData = new FormData();
        formData.append('file', file);

        if (extraData) {
            Object.keys(extraData).forEach(key => {
                formData.append(key, extraData[key]);
            });
        }

        return this.http.post<T>(url, formData);
    }

    uploadMultipleFiles<T>(url: string, files: File[], extraData?: Record<string, any>): Observable<T> {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append('files', file);
        });

        if (extraData) {
            Object.keys(extraData).forEach(key => {
                formData.append(key, extraData[key]);
            });
        }

        return this.http.post<T>(url, formData);
    }

    viewFileById(url: string, fileId: string | number): Observable<Blob> {
        return this.http.get(`${url}/${fileId}`, {
            responseType: 'blob'
        });
    }

    downloadFileById(url: string, fileId: string | number): Observable<Blob> {
        return this.http.get(`${url}/${fileId}`, {
            responseType: 'blob'
        });
    }
}

