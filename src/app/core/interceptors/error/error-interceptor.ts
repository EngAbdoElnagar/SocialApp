import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toastr = inject(ToastrService);
  
  return next(req).pipe(catchError(err => {
    if (
      req.url.includes("signin") &&
      req.url.includes("signup") 
  
  ) {
      
      toastr.error(err.error.message, "Route Linked Posts")
    }

    return throwError(() => err);
  }))
};
