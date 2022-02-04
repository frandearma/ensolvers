import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import { ToastrService } from 'ngx-toastr';
import Swal from "sweetalert2";
import {FoldersService} from "../../services/folders/folders.service";
import {TaskService} from "../../services/task/task.service";
@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
  public tasks: any;
  public folderID: any;
  public folderName: string = "";
  public folders: any;

  constructor(
    private folderServices: FoldersService,
    private router : Router,
    //private ref : ChangeDetectorRef,
    private title: Title,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit(): void {
    this.title.setTitle('ToDo App | Ensolvers');
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
    this.loadFolderAndTask();

  }

  loadFolderAndTask() {
    this.folderServices.getFolders().subscribe((data: any) => {
      this.folders = data;
      console.log(data)
    })
  }

  deleteFolder( id: number, text: string) {
    Swal.fire({
      title: "¿Are you sure you want to delete " + text + " and Task's?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.folderServices.deleteFolder(id).subscribe((data) => {
          if (data){
            this.alertDelete();
          }
        });
      }
    });
  }
  alertDelete(): void {
    this.toastr.success("Folder and Task's successfully removed");
  }
}
