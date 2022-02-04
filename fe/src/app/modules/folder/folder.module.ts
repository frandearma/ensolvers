import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FolderComponent } from './folder.component';
import {FolderDetailComponent} from "./detail-folder/folder-detail.component";
import {FolderNewComponent} from "./new-folder/new-folder.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [FolderComponent, FolderDetailComponent, FolderNewComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
          {
                path: 'detail',
                component: FolderComponent,
          },
          {
            path: 'new-folder',
            component: FolderNewComponent,
          },
          {
            path: ':id',
            component: FolderDetailComponent,
          },
        ]),
    ],
})
export class FolderModule {}
