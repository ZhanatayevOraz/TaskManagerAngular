import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../model/Task';

@Component({
  selector: 'app-TaskItemComponent',
  templateUrl: './TaskItemComponent.component.html',
  styleUrls: ['./TaskItemComponent.component.css']
})
export class TaskItemComponentComponent implements OnInit {

  constructor() { }
  @Input()
  detail!:Task;
  @Input() 
  index!: number;
  @Output() onDeleteTask = new EventEmitter<number>();
  ngOnInit() {
  }
  triggerDeleteTask(){
    this.onDeleteTask.emit(this.index);
  }
  updateCompleted(){
    
  }
}
