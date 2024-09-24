import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.apiUrl;
  if (!req.url.includes('assets/'))
    req = req.clone({
      url: `${baseUrl}${req.url}`,
    });
  return next(req);
};
