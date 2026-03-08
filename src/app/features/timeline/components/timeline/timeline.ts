import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { PostCard } from "../../../../shared/components/post-card/post-card";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Posts } from '../../../../core/services/posts/posts';
import { IPost } from '../../../../core/models/IPost/ipost';
import { Createpost } from "../../../../shared/components/createpost/createpost";
import { SuggestionServices } from '../../../../core/services/suggestions/suggestion-services';
import { ISuggestion } from '../../../../core/models/ISuggestion/isuggestion';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
  type TabType = 'Feed' | 'Community' | 'MyPosts' | 'Saved';
@Component({
  selector: 'app-timeline',
  imports: [PostCard, FormsModule, ReactiveFormsModule, Createpost,RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline implements OnInit{
  private readonly postsService = inject(Posts);
  private readonly suggestionServices = inject(SuggestionServices);
  private readonly toastr = inject(ToastrService);
  private readonly spinner = inject(NgxSpinnerService);

  postList: IPost[] = [];
  homeFeedList: IPost[] = [];
  isLoading: boolean = false;
  ngOnInit(): void {
    this.getToken();
    this.getFollowSuggestions()
    this.changeTab('Feed');
  }


  currentUserId!: string;

getToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded: any = jwtDecode(token);
    
    this.currentUserId = decoded.user;
  }
  this.getAllPosts()
}
  // getHomeFeed Feed
  getHomeFeed() {
    this.isLoading = true;
    this.postsService.getHomeFeed().subscribe({
      next: (res) => {
        this.homeFeedList = res.data.posts;
        this.filteredPosts = res.data.posts;
        this.isLoading = false;
        this.toastr.success(res.message, "Post App");
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

  // GetAlPosts Community
  getAllPosts() {
    this.isLoading = true;
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        if (res.success) {
          this.postList = res.data.posts;
          this.filteredPosts = res.data.posts;
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      }
  })
  }
  // My Posts
  getUserPosts() {
      this.isLoading = true;
    this.postsService.getUserPosts(this.currentUserId).subscribe({
      next: (res) => {
        this.filteredPosts = res.data.posts;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
  // My Saved
  getPostsSaved() {
    this.isLoading = true;
    this.postsService.getBookmarks().subscribe({
      next: (res) => {
        this.filteredPosts = res.data.bookmarks;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

  isSuggestedVisible: boolean = false;
  togel() {
    this.isSuggestedVisible = !this.isSuggestedVisible
  }
    // Get Follow Suggestions
  suggestionList: ISuggestion[] = [];
  getFollowSuggestions() {
    this.suggestionServices.getFollowSuggestions().subscribe({
      next: (res) => {
        this.suggestionList = res.data.suggestions;
      },
      error: (err) => {
      }
    })
  }

  selectedFilter: 'Feed' | 'Community' | 'MyPosts' | 'Saved' = 'Community';
  activeTab: TabType = 'Feed';
  filteredPosts: IPost[] = [];

  changeTab(tab: TabType) {
    this.activeTab = tab;
    
    if (tab === 'Feed') this.getHomeFeed();
    if (tab === 'Community') this.getAllPosts();
    if (tab === 'MyPosts') this.getUserPosts();
    if (tab === 'Saved') this.getPostsSaved();
  }

}
