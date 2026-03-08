import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class CommentServices {

  private readonly httpClient = inject(HttpClient);

  getPostComments(pstId:any):Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${pstId}/comments`)
  }

  createComment( data:any , pstId:any):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/posts/${pstId}/comments`, data )
  }
  
  updateComment( data:any , pstId:any , commentId:any):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${pstId}/comments/${commentId}`,data )
  }

  deleteComment( pstId:any , commentId:any):Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/posts/${pstId}/comments/${commentId}` )
  }

}
