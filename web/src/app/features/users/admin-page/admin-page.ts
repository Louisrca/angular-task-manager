import { Component, inject, signal, WritableSignal } from '@angular/core';
import { UsersService } from '../services/users-service';
import { User } from '../../../core/auth/interfaces/user';
import { Tasks } from '../../task/interfaces/tasks';
import { TaskService } from '../../task/services/taskService';
import { AuthService } from '../../../core/auth/services/auth-service';

@Component({
  selector: 'app-admin-page',
  imports: [],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {
  private usersService = inject(UsersService);
  protected authService = inject(AuthService);
  private tasksService = inject(TaskService);

  users = this.usersService.users;
  deletedUsers = this.usersService.deletedUsers;
  tasks: WritableSignal<Tasks[]> = signal<Tasks[]>([]);
  hiddenUserId = signal<number | null>(null);
  message = signal<string | null>(null);

  currentUser: User | null = this.authService.currentUser()

  ngOnInit() {
    this.getAllUsers();
    this.getAllTasks()
  }

  getAllUsers() {
    this.usersService.loadUsers()
  }

  getAllTasks() {
    this.tasksService.getAllTask().subscribe({
      next: (tasks: Tasks[]) => this.tasks.set(tasks),
      error: () => console.log('Une erreur est survenue lors de la récupération des tâches'),
    });
  }

  getTaskCount(userId: number): number {
    return this.tasks().filter((task) => task.user?.id === userId).length;
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user);
  }
  isCurrentUser(username: string): boolean {
    return username !== this.currentUser?.username ;

  }
}
