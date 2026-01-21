import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../services/taskService';
import { Status, Tasks } from '../interfaces/tasks';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskStatusPipe } from '../pipe/task-status-pipe';

type TaskFilter = 'ALL' | 'TODO' | 'DONE';

@Component({
  selector: 'app-task-list',
  imports: [RouterLink, TaskStatusPipe],
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
        return tasks.filter(
          t => t.status === Status.PENDING
        );
      case 'DONE':
        return tasks.filter(t => t.status === Status.DONE);
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
        next: (tasks) => this.tasks.set(tasks),
        error: () => console.log('error'),
      });
  }

  startTask(task: Tasks) {
    this.taskService
      .updateTask(task.id, { ...task, status: Status.IN_PROGRESS })
      .subscribe(() => this.getTasks());
  }

  markAsDone(task: Tasks) {
    this.taskService
      .updateTask(task.id, { ...task, status: Status.DONE })
      .subscribe(() => this.getTasks());
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
}
