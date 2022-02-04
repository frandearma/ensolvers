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
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  public folders: any;
  public folderName: string = "";
  public selectedFolder: number = 0;

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

  formNewTask = new FormGroup({
    detail: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)])),
    selectFolder: new FormControl()
  })

  @ViewChild('btnNewTask', {static: false})
  btnNewTask!: ElementRef;

  ngOnInit(): void {
    this.title.setTitle('New Tasks | Ensolvers');
    this.activatedRoute.queryParams.subscribe(params => {
      let folderID = params['idFolder'];
      if(folderID && folderID>0){
        this.selectedFolder = folderID;
      }
    });
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
    this.loadFolders();
  }
  newTask() {
    if (this.formNewTask.valid) {
      this.renderer.setProperty(this.btnNewTask.nativeElement, 'disabled', 'true');
    this.taskServices.setTask(this.formNewTask.value.detail, this.formNewTask.value.folder).subscribe(
        data => {
          if (data) {
            this.toastNewTask();
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

  loadFolders() {
    this.foldedrServices.getFolders().subscribe((data: any) => {
      this.folders = data;
    })
  }

  toastNewTask() {
    this.toastr.success("Task successfully created")
  }
  toastUpdateTaskError() {
    this.toastr.error("Error when created the task")
  }
  toastUpdateTaskWarning() {
    this.toastr.warning("Some fields are required")
  }
}
