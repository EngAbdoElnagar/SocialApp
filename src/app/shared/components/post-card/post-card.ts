import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IPost } from '../../../core/models/IPost/ipost';
import { Bookmark } from '../../../core/services/bookmark/bookmark';
import { Delete } from '../../../core/services/delete/delete';
import { Like } from '../../../core/services/like/like';
import { Posts } from './../../../core/services/posts/posts';
import { Component,  EventEmitter,  inject, Input, OnInit, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Ubdate } from '../../../core/services/ubdate/ubdate';
import { Comments } from "../comments/comments";
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { TimePipe } from '../../pipes/time-pipe';
import { ImageModal } from "../image-modal/image-modal";



@Component({
  selector: 'app-post-card',
  imports: [ReactiveFormsModule, Comments, RouterLink, TimePipe, ImageModal],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css',
})
export class PostCard implements OnInit{
  @Input({ required: true }) post!: IPost
  @Input() currentUserId!: string;
  @Output() refreshData = new EventEmitter<void>();
  private readonly router = inject(Router);
  private readonly bookmarkService = inject(Bookmark);
  private readonly likeService = inject(Like);
  private readonly deleteService = inject(Delete);
  private readonly ubdateService = inject(Ubdate);
  private readonly toastr = inject(ToastrService);


  get myPost(): boolean {
  return this.post.user._id === this.currentUserId;
  }
  
  ngOnInit(): void {
    initFlowbite();
  }
  
  isPrivacyMenuOpen: boolean = false;

  togglePrivacyMenu() {
    this.isPrivacyMenuOpen = !this.isPrivacyMenuOpen;
    if (this.isPrivacyMenuOpen) this.isMenuOpen = false;
    
  }
  setPrivacy(value: string) {
  this.post.privacy = value;
  this.isPrivacyMenuOpen = false;
}
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
    if (this.isMenuOpen) this.isPrivacyMenuOpen = false;
  }


  selectedImgForModal: string | null = null;
  
  openImage(imgUrl: string) {
    this.selectedImgForModal = imgUrl;
    document.body.style.overflow = 'hidden';
  }

  closeImage() {
    this.selectedImgForModal = null;
    document.body.style.overflow = 'auto';
  }

get isLiked(): boolean {
  return this.post.likes?.includes(this.currentUserId);
}

  toggleLike(postId: string) {

  let userId = this.currentUserId;
  let isLiked = this.post.likes?.includes(userId);

  if (isLiked) {
    this.post.likes = this.post.likes.filter(id => id !== userId);
    this.post.likesCount--;
  } else {
    this.post.likes = [...(this.post.likes || []), userId];
    this.post.likesCount++;
  }

    this.likeService.getLike(postId).subscribe({
      next: (res) => {
        
      },
      error: (err) => {
        
      }
  })
}
// Saved
  toggleSave(post: IPost) {
    this.isMenuOpen = false;
    this.bookmarkService.getBookmark(post._id).subscribe({
      next: (res) => {
        post.bookmarked = !post.bookmarked;
        this.isMenuOpen = false;
    },
    error: (err) => {
    }
  });
  }
  // Ubdate Post
  postDescription: FormControl = new FormControl("");

  isEditingPost: boolean = false;
  
  get isPostDisabled(): boolean {
      let hasNoText = !this.postDescription.value || this.postDescription.value.trim() === '';
      return hasNoText 
  }

  editPost() {
    this.isMenuOpen = false;

    this.isEditingPost = !this.isEditingPost;
    if (this.isEditingPost) {
    this.postDescription.setValue(this.post.body);
  } else {
    this.postDescription.setValue(this.post.body);
  }
  }

  formEditPost(e: SubmitEvent) {
    e.preventDefault()
    let formData = new FormData();
    if (this.postDescription.valid) {
      formData.append("body", this.postDescription.value);
    }

    this.ubdateService.ubdatePost(this.post._id, formData).subscribe({
      next: (res) => {
        this.post.body = this.postDescription.value;
        this.isEditingPost = false;
        this.toastr.success(res.message,"Ubdate Posts")
      },
      error: (err) => {
        
      }
    })
  }

  
  // Ubdate Post
  // Model Delete

  selectedPostId: string | null = null;

  openDeleteModal(postId: string) {
    this.selectedPostId = postId;
    this.isMenuOpen = false;
  }

  closeDeleteModal() {
    this.selectedPostId = null;
  }

  confirmDelete() {
    if (this.post._id) {
      this.deleteService.deletePost(this.post._id).subscribe({
        next: (res) => {
          this.refreshData.emit();
          this.toastr.success(res.message, "Deleted Posts");
        },
        error: (err) => {
          
        }
      })
      this.closeDeleteModal();
    }
  }

  isCommentOpen: boolean = false
  toggleComment() {
    this.isCommentOpen = !this.isCommentOpen
  }

}
