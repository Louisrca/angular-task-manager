import { DatePipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { StatusBadge } from '../../../shared/status-badge/status-badge';
import { Status, Tasks } from '../interfaces/tasks';
import { TaskService } from '../services/taskService';

type TaskFilter = 'ALL' | 'TODO' | 'DONE';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink, StatusBadge, DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private taskService = inject(TaskService);
  private destroyRef = inject(DestroyRef);

  tasks = signal<Tasks[]>([]);
  filter = signal<TaskFilter>('ALL');

  filteredTasks = computed(() => {
    const tasks = this.tasks();

    switch (this.filter()) {
      case 'TODO':
        return tasks.filter((t) => t.status === Status.PENDING);
      case 'DONE':
        return tasks.filter((t) => t.status === Status.DONE);
      default:
        return tasks;
    }
  });

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService
      .getAllTask()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (tasks: Tasks[]) => this.tasks.set(tasks),
        error: () => console.log('error'),
      });
  }

  startTask(task: Tasks) {
    this.taskService.updateTask(task.id, { ...task, status: Status.IN_PROGRESS }).subscribe({
      next: () => this.getTasks(),
      error: () => console.log('error'),
    });
  }

  markAsDone(task: Tasks) {
    this.taskService.updateTask(task.id, { ...task, status: Status.DONE }).subscribe({
      next: () => this.getTasks(),
      error: () => console.log('error'),
    });
  }

  setFilter(filter: TaskFilter) {
    this.filter.set(filter);
  }

  getStatusColor(status: Status | undefined) {
    switch (status) {
      case Status.PENDING:
        return 'bg-red-100 text-red-800';
      case Status.IN_PROGRESS:
        return 'bg-amber-100 text-amber-800';
      case Status.DONE:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  deleteTask(taskId: number | undefined) {
    if (taskId == null) return;
    if (confirm('Etes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
        },
      });
    }
  }

  backStatus(task: Tasks) {
    if (task.status === Status.IN_PROGRESS) {
      this.taskService.updateTask(task.id, { ...task, status: Status.PENDING }).subscribe({
        next: () => this.getTasks(),
      });
    } else if (task.status === Status.DONE) {
      this.taskService.updateTask(task.id, { ...task, status: Status.IN_PROGRESS }).subscribe({
        next: () => this.getTasks(),
      });
    }
  }
}
