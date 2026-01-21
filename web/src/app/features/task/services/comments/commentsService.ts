import { Injectable, signal } from '@angular/core';
import { Comment } from '../../interfaces/comments';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private readonly STORAGE_KEY = 'comments';

  readonly comments = signal<Comment[]>(this.readFromStorage());

  addComment(comment: Comment) {
    const next = [...this.comments(), comment];
    this.comments.set(next);
    this.writeToStorage(next);
  }

  getCommentsByTaskId(taskId: number): Comment[] {
    return this.comments().filter((c) => c.taskId === taskId);
  }

  setComments(comments: Comment[]) {
    this.comments.set(comments);
    this.writeToStorage(comments);
  }

  refreshFromStorage() {
    this.comments.set(this.readFromStorage());
  }

  private readFromStorage(): Comment[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Comment[]) : [];
    } catch {
      return [];
    }
  }

  private writeToStorage(comments: Comment[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(comments));
  }
}
