import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../model/Task';
import { TaskServiceService } from '../../service/TaskService.service';
@Component({
  selector: 'app-TaskFormComponent',
  templateUrl: './TaskFormComponent.component.html',
  styleUrls: ['./TaskFormComponent.component.css']
})
export class TaskFormComponentComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private taskService : TaskServiceService
    ) {
      this.taskForm = this.formBuilder.group({
        title: ['', Validators.required],
        importance: [false, Validators.required],
        description: ['', Validators.required],
        tags: this.formBuilder.group({
          completed: false,
          education: false,
          health: false,
          quickly: false,
          productivity:false
        }),
        dateOfCompletion: ['', Validators.required]
      });
     }
    taskForm!: FormGroup;
  ngOnInit() {
  }
  @Input()
  modalOpen!:boolean;
  onSubmit(): void {
    console.log(this.taskForm.value); 
    const newTaskId = Date.now();
    const newTask: Task = new Task(
      newTaskId,
      this.taskForm.value.title,
      this.taskForm.value.importance,
      this.taskForm.value.description,
      this.taskForm.value.tags,
      this.taskForm.value.dateOfCompletion
    );
    this.modalOpen = false;
    this.taskService.createNewTask(newTask);
    this.closeModal.emit();
  }
  @Output() closeModal = new EventEmitter<void>();

  back(){
    this.modalOpen = false;
    this.closeModal.emit();
  }

}


