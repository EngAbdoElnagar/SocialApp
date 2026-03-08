import { HttpClient, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class Posts {
  private readonly httpClient = inject(HttpClient);
  
  getAllPosts():Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts`)
  }
  getHomeFeed():Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/feed?only=following&limit=20` )
  }

  createPost(data:any):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/posts`, data )
  }

  getSinglePost(postId:any):Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}`  )
  }

  getUserPosts(userId:any):Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/posts`  )
  }

  getUserProfile(userId:any):Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/profile`  )
  }
  
  getBookmarks():Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/bookmarks`  )
  }
  
  uploadPhoto(data:any):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/users/upload-photo`, data )
  }
}
