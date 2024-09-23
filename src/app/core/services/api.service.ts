import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) {}

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  post<T>(url: string, body?: unknown, params?: HttpParams): Observable<T> {
    return this.http.post<T>(url, body, { params });
  }

  put<T>(url: string, body?: unknown, params?: HttpParams): Observable<T> {
    return this.http.put<T>(url, body, { params });
  }

  delete<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(url, { params });
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error?.error?.status === 403) {
        this.toast.error(
          'You do not have permission to perform this action',
          'Forbidden'
        );
      }
      this.toast.error(
        `${operation} failed: ${error?.error?.detail ?? error?.error?.message}`,
        'Error'
      );
      return of(result as T);
    };
  }
}
