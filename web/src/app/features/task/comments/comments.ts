import { Component, effect, inject, input, Input } from '@angular/core';
import { Comment } from '../interfaces/comments';
import { CommentsService } from '../services/comments/commentsService';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth-service';
import { v4 as uuidv4 } from 'uuid';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.html',
  imports: [ReactiveFormsModule, DatePipe],
})
export class Comments {
  commentsService = inject(CommentsService);
  authService = inject(AuthService);

  currentUser = this.authService.currentUser();

  taskId = input<number | undefined>();

  fb = new FormBuilder();

  commentForm = this.fb.group({
    comment: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500),
        Validators.pattern(/\S/),
      ],
    ],
  });

  comments: Comment[] = [];
  constructor() {
    effect(() => {
      const id = this.taskId();
      if (id != null) {
        this.comments = this.commentsService.getCommentsByTaskId(id);
      } else {
        this.comments = [];
      }
    });
  }

  onSubmit() {
    if (this.commentForm.valid && this.currentUser && this.taskId) {
      const newComment: Comment = {
        id: uuidv4(),
        taskId: this.taskId(),
        content: this.commentForm.get('comment')?.value || '',
        createdAt: new Date().toISOString(),
        createdBy: {
          id: this.currentUser.id,
          username: this.currentUser.username,
          role: this.currentUser.role,
        },
      };
      this.commentsService.addComment(newComment);
      this.comments = [...this.comments, newComment];
      this.commentForm.reset();
    }
  }

  getUserColor(username: string): string {
    if (username === this.currentUser?.username) {
      return 'text-indigo-600';
    }
    return 'text-slate-600';
  }
}
