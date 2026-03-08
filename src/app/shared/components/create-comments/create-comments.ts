import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommentServices } from '../../../core/services/comments/comment-services';
import { AuthService } from '../../../core/services/auth/auth-service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-comments',
  imports: [FormsModule, ReactiveFormsModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './create-comments.html',
  styleUrl: './create-comments.css',
})
export class CreateComments {
  @Output() refreshFeed = new EventEmitter<void>();
  @Input( {required : true} ) postId! : string
  private readonly commentServices = inject(CommentServices);
  private readonly authService = inject(AuthService);

  userName: string = "";
  userEmail: string = "";
  userPhoto: string = "";
  uploadedFile: any;
  ngOnInit(): void {
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
  
  postDescription: FormControl = new FormControl("");
  imagePreview: string | ArrayBuffer | null = null;

  get isCommentDisabled(): boolean {
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

  createComment(e: SubmitEvent) {

    let formData = new FormData();
    if (this.postDescription.valid ) {
      formData.append("content", this.postDescription.value);
    }
    if (this.uploadedFile) {
      formData.append("image", this.uploadedFile);
    }
    this.commentServices.createComment(formData,this.postId).subscribe({
    next: (res) => {
      this.refreshFeed.emit();
        this.imagePreview = null;
        this.uploadedFile = null;
        this.postDescription.reset();
        this.showEmojiPicker = false;

    },
    error: (err) => {
    }
    })
    
  }
  removeImage() {
  this.uploadedFile = null;
  this.imagePreview = null;
}
  // ??????????????????????
  showEmojiPicker = false;
  postText: string = '';

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    this.postText += event.detail.unicode;
  }
}
