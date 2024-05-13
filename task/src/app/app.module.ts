import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { TaskFormComponentComponent } from './component/TaskFormComponent/TaskFormComponent.component';
import { TaskItemComponentComponent } from './component/TaskItemComponent/TaskItemComponent.component';
import { TaskListComponentComponent } from './component/TaskListComponent/TaskListComponent.component';



@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponentComponent,
    TaskListComponentComponent,
    TaskItemComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,  
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
