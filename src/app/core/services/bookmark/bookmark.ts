import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class Bookmark {

  private readonly httpClient = inject(HttpClient);

  getBookmark(postid:string):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postid}/bookmark`, {} )
    }
}
