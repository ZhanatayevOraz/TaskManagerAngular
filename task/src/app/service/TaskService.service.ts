import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Tag, Task } from '../../model/Task';
import { moveItemInArray } from '@angular/cdk/drag-drop';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
 
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private filterTagsSubject = new BehaviorSubject<Tag>({ completed: false, education: false, health: false, quickly: false, productivity: false });
  tasks$ = this.tasksSubject.asObservable();  
  filteredTasks$ = this.tasks$;
  constructor() {
    this.loadTasks(); 
    this.applyFilters();
  }

  loadTasks(){
    const storedTasks = localStorage.getItem('main1');
    if (storedTasks) {
      this.tasksSubject.next(JSON.parse(storedTasks));
    } else {
      console.log('No tasks found in localStorage');
    }
  }

  getAllTask(): Observable<Task[]> {
    return this.tasks$; 
  }

  createNewTask(newTask: Task) {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, newTask]);
    this.updateLocalStorage();
  }

  Delete(index: number) {
    const currentTasks = this.tasksSubject.value;
    if (index >= 0 && index < currentTasks.length) {
      const updatedTasks = currentTasks.slice();
      updatedTasks.splice(index, 1);
      this.tasksSubject.next(updatedTasks);
      this.updateLocalStorage();
    }
  }

  updateFilteredTaskOrder(previousIndex: number, currentIndex: number, currentFilteredTasks: Task[]): void {
  
    moveItemInArray(currentFilteredTasks, previousIndex, currentIndex);

    const updatedTasks = this.tasksSubject.value.slice(); 

    
    const movedTask = currentFilteredTasks[currentIndex];
    const originalCurrentIndex = updatedTasks.findIndex(task => task.id === movedTask.id); 

   
    const movedTaskOriginal = currentFilteredTasks[previousIndex]; 
    const originalPreviousIndex = updatedTasks.findIndex(task => task.id === movedTaskOriginal.id); 

    
    moveItemInArray(updatedTasks, originalPreviousIndex, originalCurrentIndex);

    this.tasksSubject.next(updatedTasks); 
    this.updateLocalStorage(); 
}

  updateLocalStorage() {
    localStorage.setItem('main1', JSON.stringify(this.tasksSubject.value));
  }

  filterTasksByTags(tags: Tag): Observable<Task[]> {
    const filtered = this.tasksSubject.value.filter(task => {
      return Object.keys(tags).every(key => !tags[key] || task.tags[key]);
    });
    return of(filtered); 
  }

  private applyFilters() {
    this.filteredTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => this.isTaskVisible(task, this.filterTagsSubject.value)))
    );
  }

  isTaskVisible(task: Task, filters: Tag): boolean {
    return Object.keys(filters).every(key => !filters[key] || task.tags[key]);
  }

  updateFilterTags(newFilters: Tag) {
    this.filterTagsSubject.next(newFilters);
    this.updateFilteredTasks();  
  }
  updateFilteredTasks() {
    this.filteredTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => this.isTaskVisible(task, this.filterTagsSubject.value)))
    );
  }
}
