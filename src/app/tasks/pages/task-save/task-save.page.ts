import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss']
})
export class TaskSavePage implements OnInit {
  taskForm: FormGroup;
  pageTitle = '...';
  taskId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Guardando....'
    });
    try {
      const task = await this.tasksService.create(this.taskForm.value);
      console.log('Tarea creada ', task);
      this.navCtrl.navigateBack('/tasks');
    } catch (error) {
      console.log('Error saving task: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
