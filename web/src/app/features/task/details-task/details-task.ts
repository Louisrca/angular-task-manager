import { Component, inject, Input, signal } from '@angular/core';
import { StatusBadge } from '../../../shared/status-badge/status-badge';
import { Tasks } from '../interfaces/tasks';
import { TaskService } from '../services/taskService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.html',
  imports: [StatusBadge, DatePipe],
})
export class DetailsTask {
  taskService = inject(TaskService);

  @Input() id?: string;

  task = signal<Tasks | null>(null);

  ngOnInit() {
    if (this.id) {
      this.taskService.getTaskById(+this.id).subscribe({
        next: (task: Tasks) => {
          const taskData = {
            ...task,
            targetUserId: task.user?.id ? task.user.id.toString() : null,
          };
          this.task.set(taskData);
        },
        error: () => console.log('error'),
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
