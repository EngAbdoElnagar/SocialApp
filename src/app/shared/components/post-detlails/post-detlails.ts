import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Posts } from '../../../core/services/posts/posts';
import { PostCard } from "../post-card/post-card";
import { IPost } from '../../../core/models/IPost/ipost';
import { AuthService } from '../../../core/services/auth/auth-service';

@Component({
  selector: 'app-post-detlails',
  imports: [RouterLink, PostCard],
  templateUrl: './post-detlails.html',
  styleUrl: './post-detlails.css',
})
export class PostDetlails implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute); 
  private readonly postServices = inject(Posts)
  private readonly authService = inject(AuthService);

  postId: string | null = null;
  post!: IPost;
  currentUserId: string = ""

  ngOnInit(): void {
    
    this.getPostIdFromRoute();
    this.getCurrentUserId();
  }

  getCurrentUserId() {
    let id = this.authService.getUserId();
    if (id) {
      this.currentUserId = id;
    }
  }

  getPostIdFromRoute() {
    this.activatedRoute.paramMap.subscribe((urlPath) => {

      if (urlPath.get("id")) {
        this.postId = urlPath.get("id")
        this.getPostDetails()
      }
    })
  }

  getPostDetails() {
    this.postServices.getSinglePost(this.postId).subscribe({
      next: (res) => {
        this.post = res.data.post;
      },
      error: (err) => {
        
      }
    })
  }

}
