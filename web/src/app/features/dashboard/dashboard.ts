import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { TaskService } from '../task/services/taskService';
import { AuthService } from '../../core/auth/services/auth-service';
import { Tasks, Status } from '../task/interfaces/tasks';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  imports: [CommonModule],
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private taskService = inject(TaskService);
  public authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  tasks = signal<Tasks[]>([]);

  ngOnInit() {
    this.loadTasks();
  }



  loadTasks() {
    this.taskService
      .getAllTask()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: tasks => this.tasks.set(tasks),
        error: () => console.error('Erreur chargement dashboard'),
      });
  }


  totalTasks = computed(() => this.tasks().length);

  doneTasks = computed(() =>
    this.tasks().filter(t => t.status === Status.DONE).length
  );

  myTasks = computed(() => {
    const user = this.authService.currentUser();
    if (!user?.username) return 0;

    return this.tasks().filter(
      task => task.user?.username === user.username
    ).length;
  });


  isAdmin = computed(
    () => this.authService.currentUser()?.role === 'ADMIN'
  );

  completionPercent = computed(() => {
    const tasks = this.tasks();
    if (tasks.length === 0) return 0;

    const done = tasks.filter(t => t.status === Status.DONE).length;
    return Math.round((done / tasks.length) * 100);
  });


}
