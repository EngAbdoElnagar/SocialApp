import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CommentServices } from '../../../core/services/comments/comment-services';
import { IComments } from '../../../core/models/IComments/icomments';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-post-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './get-post-comments.html',
  styleUrl: './get-post-comments.css',
})
export class GetPostComments implements OnInit {
  private readonly commentServices = inject(CommentServices)
  @Output() refreshData = new EventEmitter<void>();
  @Input({ required: true }) postId!: string
  @Input({ required: true }) postOwnerId!: string;
  @Input({ required: true }) currentUserId!: string;
  ngOnInit(): void {
    initFlowbite();
    this.getPostComments()
  }
  commentsLists: IComments[] = [];

  isMyComment(comment: IComments): boolean {
    return comment.commentCreator._id === this.currentUserId;
  }
  isPostOwner(): boolean {
    return this.postOwnerId === this.currentUserId;
  }
  
  testfunc(e: IComments) {
    
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

  getPostComments() {
    this.commentServices.getPostComments(this.postId).subscribe({
      next: (res) => {
        this.commentsLists = res.data.comments;
        setTimeout(() => {
          initFlowbite();
        }, 100);
      },
      error: (err) => {
        
      }
    })
  }

    //  Model
    selectedCommentId: string | null = null;

    openDeleteModal(commentId: string) {
      this.selectedCommentId = commentId;
    }

    closeDeleteModal() {
      this.selectedCommentId = null;
    }

    confirmDelete() {
      if (this.postId && this.selectedCommentId) {
        this.commentServices.deleteComment(this.postId, this.selectedCommentId).subscribe({
          next: (res) => {
            this.getPostComments()
            this.refreshData.emit();
            this.closeDeleteModal();
          },
          error: (err) => {
          }
        })
        this.closeDeleteModal();
      }
    }

  postDescription: FormControl = new FormControl("");
  selectedCommentIdEdit: string | null = null;
  isEditingPost: boolean = false;
  
  get isPostDisabled(): boolean {
      let hasNoText = !this.postDescription.value || this.postDescription.value.trim() === '';
      return hasNoText 
  }

 editPost(comment: IComments) {
  if (this.selectedCommentIdEdit === comment._id) {
    this.selectedCommentIdEdit = null;
    this.postDescription.reset();
  } else {
    this.selectedCommentIdEdit = comment._id;
    this.postDescription.setValue(comment.content);
  }
}

  formEditPost(e: SubmitEvent, commentId: string) {
    e.preventDefault()
    let formData = new FormData();
    if (this.postDescription.valid) {
      formData.append("content", this.postDescription.value);
    }

    this.commentServices.updateComment(formData, this.postId, commentId).subscribe({
      next: (res) => {
        const index = this.commentsLists.findIndex(c => c._id === commentId);
        if (index !== -1) {
          this.commentsLists[index].content = this.postDescription.value;
        }
        this.selectedCommentIdEdit = null;
        this.postDescription.reset()
      },
      error: (err) => {
        
      }
    })
  }
  
}



