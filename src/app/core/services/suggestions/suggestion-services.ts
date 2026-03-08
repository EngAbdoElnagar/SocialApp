import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SuggestionServices {
  private readonly httpClient = inject(HttpClient);

    getFollowSuggestions():Observable<any> {
      return this.httpClient.get(`${environment.baseUrl}/users/suggestions?limit=5`);
    }
}
