import { Component, inject, Input } from '@angular/core';
import { CommentServices } from '../../../core/services/comments/comment-services';
import { GetPostComments } from "../get-post-comments/get-post-comments";
import { CreateComments } from "../create-comments/create-comments";

@Component({
  selector: 'app-comments',
  imports: [GetPostComments, CreateComments],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  private readonly commentServices = inject(CommentServices);
  @Input({ required: true }) postId!: string
  @Input({ required: true }) postOwnerId!: string;
  @Input({ required: true }) currentUserId!: string;
}
