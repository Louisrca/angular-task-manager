import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/auth/interfaces/user';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`;

  private readonly _users = signal<User[]>([]);
  private readonly _deletedUsers = signal<User[]>(this.readFromStorage());

  readonly users = this._users.asReadonly();
  readonly deletedUsers = this._deletedUsers.asReadonly();

  constructor(private http: HttpClient) {}

  loadUsers() {
    this.http.get<User[]>(this.apiUrl).subscribe(users => {
      const deletedIds = new Set(this._deletedUsers().map(u => u.id));
      const filtered = users.filter(u => !deletedIds.has(u.id));
      this._users.set(filtered);
    });
  }

  deleteUser(user: User) {
    this._users.set(this._users().filter(u => u.id !== user.id));

    if (!this._deletedUsers().some(u => u.id === user.id)) {
      const next = [...this._deletedUsers(), user];
      this._deletedUsers.set(next);
      this.writeToStorage(next);
    }
  }

  restoreUser(user: User) {
    this._deletedUsers.set(this._deletedUsers().filter(u => u.id !== user.id));
    this.writeToStorage(this._deletedUsers());

    this._users.set([...this._users(), user]);
  }

  private readFromStorage(): User[] {
    try {
      const raw = localStorage.getItem('deletedUsers');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private writeToStorage(users: User[]) {
    localStorage.setItem('deletedUsers', JSON.stringify(users));
  }
}
