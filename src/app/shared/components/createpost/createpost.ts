import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Posts } from '../../../core/services/posts/posts';
import { AuthService } from '../../../core/services/auth/auth-service';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createpost',
  imports: [FormsModule, ReactiveFormsModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './createpost.html',
  styleUrl: './createpost.css',
})
export class Createpost implements OnInit{
  @Output() refreshFeed = new EventEmitter<void>();
  private readonly postsService = inject(Posts);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  
    userName: string = "";
    userEmail: string = "";
    userPhoto: string = "";
  
    ngOnInit(): void {
      initFlowbite();
      this.getUserData();
    }
  
    getUserData() {
      this.authService.userData$.subscribe(user => {
        if (user) {
          this.userName = user.name;
          this.userEmail = user.email;
          this.userPhoto = user.photo;
        }
      });
    }

  uploadedFile: any;
  uploadProgress: number = 0;
  postDescription: FormControl = new FormControl("");
  imagePreview: string | ArrayBuffer | null = null;

  get isPostDisabled(): boolean {
    let hasNoText = !this.postDescription.value || this.postDescription.value.trim() === '';
    let hasNoFile = !this.uploadedFile;

    return hasNoText && hasNoFile;
  }

prepareUploadedFile(e: Event) {
    
    let input = e.target as HTMLInputElement

    if (input) {
      if (input.files) {
        this.uploadedFile = input.files[0]
    let reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.uploadedFile);
      }
    }
  }
  
  isUploading: boolean = false;
  createPost(e: SubmitEvent) {
    this.isUploading = true;
    let formData = new FormData();
    if (this.postDescription.valid ) {
      formData.append("body", this.postDescription.value);
    }
    if (this.uploadedFile) {
      formData.append("image", this.uploadedFile);
    }
    this.postsService.createPost(formData).subscribe({
    next: (res) => {
      this.refreshFeed.emit();
        this.imagePreview = null;
        this.uploadedFile = null;
        this.postDescription.reset();
        this.showEmojiPicker = false;
        this.isUploading = false;
      this.toastr.success(res.message, "Create Post");
    },
    error: (err) => {
      console.log(err);
      this.isUploading = false;
    }
    })
    
  }
removeImage() {
  this.uploadedFile = null;
  this.imagePreview = null;
}
  showEmojiPicker = false;
  postText: string = '';

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    this.postText += event.detail.unicode;
  }
}
