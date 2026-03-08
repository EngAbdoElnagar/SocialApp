import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  // REQUEST

  if (localStorage.getItem("token")) {
    req = req.clone({
      setHeaders: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  return next(req); // RESPONSE
};
