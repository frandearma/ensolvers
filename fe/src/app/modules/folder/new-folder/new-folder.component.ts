import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import { ToastrService } from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FoldersService} from "../../../services/folders/folders.service";
@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.css']
})
export class FolderNewComponent implements OnInit {
  constructor(
    private folderServices : FoldersService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    //private ref : ChangeDetectorRef,
    private title: Title,
    private renderer: Renderer2,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: object) {
  }

  formNewFolder = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]))
  })

  @ViewChild('btnNewFolder', {static: false})
  btnNewFolder!: ElementRef;

  ngOnInit(): void {
    this.title.setTitle('New Folder | Ensolvers');
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
  }

  newFolder() {
    if (this.formNewFolder.valid) {
      this.renderer.setProperty(this.btnNewFolder.nativeElement, 'disabled', 'true');
    this.folderServices.setFolder(this.formNewFolder.value.name).subscribe(
        data => {
          if (data) {
            this.toastNewFolder();
          }
          this.router.navigate(['/folder/detail']);
        }
        , error => {
          this.toastUpdateFolderError();
        }
      );
    } else {
      this.toastUpdateFolderWarning();
    }
  }

  toastNewFolder() {
    this.toastr.success("Folder successfully created")
  }
  toastUpdateFolderError() {
    this.toastr.error("Error when created the folder")
  }
  toastUpdateFolderWarning() {
    this.toastr.warning("Some fields are required")
  }
}
