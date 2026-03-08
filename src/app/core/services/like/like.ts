import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Like {
    private readonly httpClient = inject(HttpClient);
  
  private getOptions() {
    return {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
  }

  getLike(postid:string):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postid}/like`, {})
    }
}
