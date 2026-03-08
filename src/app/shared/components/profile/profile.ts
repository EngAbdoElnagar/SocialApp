import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth-service';
import { IUserData } from '../../../core/models/IUserData/iuser-data';
import { Posts } from '../../../core/services/posts/posts';
import { IPost } from '../../../core/models/IPost/ipost';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageModal } from "../image-modal/image-modal";

@Component({
  selector: 'app-profile',
  imports: [NgClass, RouterLink, FormsModule, ImageModal],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly postService = inject(Posts);

  userData!: IUserData;
  currentUserId: string = '';

  myPosts: IPost[] = [];
  myPostsSaved: IPost[] = [];

  activeTab: 'posts' | 'saved' = 'posts';

  isLoading: boolean = false;

  selectedImgForModal: string | null = null;

  isEditModalOpen: boolean = false;
  uploadedFile: File | null = null;
  selectedFilePreview: string | null = null;
  zoomScale: number = 1;
  isUploading: boolean = false;

  ngOnInit(): void {
    this.getCurrentUserId();
    this.getMyProfile();
  }

  getCurrentUserId() {
    const id = this.authService.getUserId();
    if (id) this.currentUserId = id;
  }

  getMyProfile() {
    this.isLoading = true;
    this.authService.getMyProfile().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.userData = res.data.user;
        this.getUserPosts();
        this.getPostsSaved();
      },
      error: (err) => {
        this.isLoading = false;
      }
        
    });
  }

  getUserPosts() {
    this.isLoading = true;
    this.postService.getUserPosts(this.currentUserId).subscribe({
      next: (res) => {
        this.myPosts = res.data.posts;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

  getPostsSaved() {
    this.isLoading = true;
    this.postService.getBookmarks().subscribe({
      next: (res) => {
        this.myPostsSaved = res.data.bookmarks;
      },
      error: (err) => {
        this.isLoading = false;
      } 
    });
  }

  changeTab(tab: 'posts' | 'saved') {
    this.activeTab = tab;
  }

  openImage(imgUrl: string) {
    this.selectedImgForModal = imgUrl;
    document.body.style.overflow = 'hidden';
  }

  closeImage() {
    this.selectedImgForModal = null;
    document.body.style.overflow = 'auto';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.uploadedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFilePreview = reader.result as string;
      this.zoomScale = 1;
      this.isEditModalOpen = true;
      document.body.style.overflow = 'hidden';
    };

    reader.readAsDataURL(file);
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedFilePreview = null;
    this.uploadedFile = null;
    this.zoomScale = 1;
    document.body.style.overflow = 'auto';
  }

  confirmUploadPhoto() {
    this.isLoading = true;
    if (!this.uploadedFile) return;

    this.isUploading = true;

    const formData = new FormData();
    formData.append('photo', this.uploadedFile);

    this.postService.uploadPhoto(formData).subscribe({
      next: (res) => {

        if (res.data.user.photo) {
          this.authService.updateUserPhoto(res.data.user.photo);
        }

        this.isUploading = false;
        this.closeEditModal();
      },
      error: (err) => {
        this.isLoading = false;
        this.isUploading = false;
      }
    });
  }

}
