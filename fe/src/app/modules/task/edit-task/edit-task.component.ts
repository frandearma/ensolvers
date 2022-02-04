import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import { ToastrService } from 'ngx-toastr';
import Swal from "sweetalert2";
import {TaskService} from "../../../services/task/task.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FoldersService} from "../../../services/folders/folders.service";
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  public task: any;
  public folders: any;
  public folderID: any;
  public detailTask : any;
  private idTask: any;

  constructor(
    private taskServices: TaskService,
    private foldedrServices : FoldersService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    //private ref : ChangeDetectorRef,
    private title: Title,
    private renderer: Renderer2,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: object) {
  }

  formEditTask = new FormGroup({
    detail: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
    selectFolder: new FormControl()
  })

  @ViewChild('btnEditTask', {static: false})
  btnEditTask!: ElementRef;

  ngOnInit(): void {
    this.title.setTitle('Edit Task | Ensolvers');
    const idTask = this.activatedRoute.snapshot.paramMap.get('id');
    if (isPlatformBrowser(this.platformId)) {
      let navMain = document.getElementById('navbarCollapse');
      if (navMain) {
        navMain.onclick = function () {
          if (navMain) {
            navMain.classList.remove("show");
          }
        }
      }
    }
    this.loadTask(idTask);
  }
  loadFolders() {
    this.foldedrServices.getFolders().subscribe((data: any) => {
      this.folders = data;
    })
  }
  editTask() {
    if (this.formEditTask.valid) {
      this.renderer.setProperty(this.btnEditTask.nativeElement, 'disabled', 'true');
    this.taskServices.updateTask(this.idTask,this.formEditTask.value.detail, this.formEditTask.value.folder).subscribe(
        data => {
          if (data) {
            this.toastEditTask();
          }
          this.router.navigate(['/task']);
        }
        , error => {
          this.toastUpdateTaskError();
        }
      );
    } else {
      this.toastUpdateTaskWarning();
    }
  }

  loadTask(id: string | null) {
    this.taskServices.getTask(id).subscribe((data: any) => {
      this.detailTask = data.detail;
      this.folderID = data.folder.id;
      this.idTask = id;
    })
    this.loadFolders();
  }

  toastEditTask() {
    this.toastr.success("Task successfully updated")
  }
  toastUpdateTaskError() {
    this.toastr.error("Error when update the task")
  }
  toastUpdateTaskWarning() {
    this.toastr.warning("Some fields are required")
  }

}
