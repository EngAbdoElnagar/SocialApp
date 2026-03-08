import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
let islLoading = true;
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

const ngxSpinnerService = inject(NgxSpinnerService);
  const isAuthRequest =
    req.url.includes('signin') || req.url.includes('signup') || req.url.includes('change-password');
  if (islLoading && !isAuthRequest) {
    ngxSpinnerService.show(undefined, { type: 'ball-scale-multiple' });

    return next(req).pipe(
      finalize(() => {
        ngxSpinnerService.hide();
        islLoading = false;
      }),
    );
  }

  return next(req);
};
