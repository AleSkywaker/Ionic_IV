import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss']
})
export class TaskSavePage implements OnInit {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
