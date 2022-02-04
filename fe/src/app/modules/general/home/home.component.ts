import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FoldersService} from "../../../services/folders/folders.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from 'ngx-toastr';
import Swal from "sweetalert2";
import {TaskService} from "../../../services/task/task.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public tasks: any;
  // @ts-ignore
  public cheked: boolean;
  // @ts-ignore
  public alertTxt: string;

  constructor(
    private taskServices: TaskService,
    private router: Router,
    //private ref : ChangeDetectorRef,
    private title: Title,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit(): void {
    this.title.setTitle('Home ToDo App | Ensolvers');
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
    this.loadTask();

  }

  loadTask() {
    this.taskServices.getTasks().subscribe((data: any) => {
      this.tasks = data;
    })
  }

  alertChecked(txt: string): void {
    this.toastr.success("Task checked completed");
  }

  alertCheckedError(): void {
    this.toastr.error("Error to check task");
  }

  checkTask(id: number, cheked: boolean) {
    if (cheked == false) {
      this.alertTxt = 'Task checked completed';
      this.cheked = true;
    } else {
      this.cheked = false;
      this.alertTxt = 'Task unchecked completed';
    }
    this.taskServices.checkTask(id, cheked).subscribe(
      data => {
        if (data) {
          this.alertChecked(this.alertTxt);
        }
        this.router.navigate(['/']);
      }
      , error => {
        this.alertCheckedError();
      }
    );
  }
}
