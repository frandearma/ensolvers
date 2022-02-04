import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NewTaskComponent} from "../task/new-task/new-task.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditTaskComponent} from "./edit-task/edit-task.component";


@NgModule({
  declarations: [NewTaskComponent, EditTaskComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
          {
            path: 'new-task',
            component: NewTaskComponent,
          },
          {
            path: 'edit-task/:id',
            component: EditTaskComponent,
          },
        ]),
    ],
})
export class TaskModule {}
