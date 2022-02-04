import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import { ToastrService } from 'ngx-toastr';
import Swal from "sweetalert2";
import {FoldersService} from "../../../services/folders/folders.service";
import {TaskService} from "../../../services/task/task.service";
@Component({
  selector: 'app-folder-detail',
  templateUrl: './folder-detail.component.html',
  styleUrls: ['./folder-detail.component.css']
})
export class FolderDetailComponent implements OnInit {
  public tasks: any;
  public folderID: any;
  public folderName: string = "";

  constructor(
    private taskServices: TaskService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    //private ref : ChangeDetectorRef,
    private title: Title,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit(): void {

    this.title.setTitle('Edit Tasks | Ensolvers');
    this.folderID = this.activatedRoute.snapshot.paramMap.get('id');
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
    this.loadTaskByFolder(this.folderID);
  }


  loadTaskByFolder(folderID: string | null) {
    this.taskServices.getTasksByFolder(folderID).subscribe((data: any) => {
      this.tasks = data;
      if(this.tasks.length){
        this.folderName = "Task for "+this.tasks[0].folder.name;
        this.folderID
      }else{
        this.folderName  = "There are no tasks. Create one now!";
      }
    })
  }
  alertDelete(): void {
    this.toastr.success("Folder and Task's successfully removed");
  }

  deleteTask(id : number, tastDetail : string) {
    Swal.fire({
      title: "¿Are you sure you want to delete " + tastDetail + "?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskServices.deleteTask(id).subscribe((data) => {
          if (data){
            this.alertDelete();
          }
        });
      }
    });
  }
}
