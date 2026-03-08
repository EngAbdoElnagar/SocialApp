import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Posts } from '../../../core/services/posts/posts';
import { IUserData } from '../../../core/models/IUserData/iuser-data';
import { IPost } from '../../../core/models/IPost/ipost';
import { PostCard } from "../post-card/post-card";

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink, PostCard],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute); 
  private readonly authService = inject(AuthService);
  private readonly postService = inject(Posts);

  userPosts: IPost[] = [];
  currentUserId: string = "";
  userId: string | null = null;
  userData!: IUserData;

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
        this.userId = urlPath.get("id")
        this.getUserProfile();
      }
    })
  }

  getUserProfile() {
    this.postService.getUserProfile(this.userId).subscribe({
      next: (res) => {
        this.userData = res.data.user
        this.getUserPosts();
      },
      error: (err) => {
        
      }
    })
  }

  getUserPosts() {
    this.postService.getUserPosts(this.userId).subscribe({
      next: (res) => {
        this.userPosts = res.data.posts;
      },
      error: (err) => {
      }
    })
  }
}
