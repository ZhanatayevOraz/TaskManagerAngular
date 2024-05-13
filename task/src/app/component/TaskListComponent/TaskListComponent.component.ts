import { Component, Input, OnInit } from '@angular/core';
import { Tag, Task } from '../../../model/Task';
import { TaskServiceService } from '../../service/TaskService.service';
import { CdkDragDrop, CdkDragMove, moveItemInArray } from '@angular/cdk/drag-drop'
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-TaskListComponent',
  templateUrl: './TaskListComponent.component.html',
  styleUrls: ['./TaskListComponent.component.css']
})
export class TaskListComponentComponent implements OnInit {

  filteredTasks: Task[] = [];
  filterTags: Tag = { completed: false, education: false, health: false, quickly: false ,productivity:false};
  
  listOfTask: Task[] = [];
  subscription!: Subscription;
  modalOpen = false;
  searchTerm: string = '';
  private destroy$ = new Subject<void>();
  constructor(private taskService: TaskServiceService) {}


  

  // ngOnInit() {
  //   this.taskService.filteredTasks$.subscribe(tasks => {
  //     this.filteredTasks = tasks;
  //   });
  // }

  // updateFilter(tag: string): void {
  //   const updatedFilters = {...this.filterTags, [tag]: !this.filterTags[tag]};
  //   this.taskService.updateFilterTags(updatedFilters);
  //   this.filterTags = updatedFilters;
  // }
  
ngOnInit() {
  this.taskService.tasks$
  .pipe(takeUntil(this.destroy$))
  .subscribe(tasks => {
    this.listOfTask = tasks;
    this.applyFilters();
  });
  
}
applyFilters() {
  this.filteredTasks = this.searchTerm
    ? this.listOfTask.filter(task => task.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
    : this.listOfTask.filter(task => this.isTaskVisible(task));

  console.log('Filtered tasks updated:', this.filteredTasks);
}

isTaskVisible(task: Task): boolean {
  return Object.keys(this.filterTags).every(key => !this.filterTags[key] || task.tags[key]);
}

  filterTasks() {
    if (!this.searchTerm) {
      this.filteredTasks = [...this.listOfTask];
    } else {
      this.filteredTasks = this.listOfTask.filter(task =>
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  this.destroy$.complete();
  }

  updateFilter(tag: string): void {
    this.filterTags[tag] = !this.filterTags[tag];
    this.taskService.updateFilterTags(this.filterTags);
    this.applyFilters();
  }

  deleteTask(index: number) {
    this.taskService.Delete(index);
    
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.filteredTasks, event.previousIndex, event.currentIndex);
  
      
      const previousId = this.filteredTasks[event.previousIndex].id;
      const currentId = this.filteredTasks[event.currentIndex].id;
  
      const previousIndexMain = this.listOfTask.findIndex(task => task.id === previousId);
      const currentIndexMain = this.listOfTask.findIndex(task => task.id === currentId);
  
      moveItemInArray(this.listOfTask, previousIndexMain, currentIndexMain);

      this.taskService.updateLocalStorage();
    }
  }
  
  onDragMoved(event: CdkDragMove<any>) {
    const point = event.pointerPosition;
    
    console.log(`Pointer X: ${point.x}, Pointer Y: ${point.y}`);
    
  }

  allowedToDrop(event: CdkDragDrop<Task[]>): boolean {
    
    return Math.abs(event.previousIndex - event.currentIndex) <= 5; 
  }

  openModal() {
    this.modalOpen = true;
  }

  
}
