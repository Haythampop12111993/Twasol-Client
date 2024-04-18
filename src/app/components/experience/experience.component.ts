import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './../../services/profiles/profile.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  faTrash = faTrash;
  faBriefcase = faBriefcase;
  color = 'black';
  inProfile = false;
  constructor(
    private ProfileService: ProfileService,
    private ToastrService: ToastrService
  ) {
    console.log(window.location.pathname);
    if (window.location.pathname === '/main/profile') {
      console.log('here');
      this.inProfile = true;
    } else {
      console.log('not here');
      this.inProfile = false;
    }
  }
  @Input() userData: any = {};
  handelMouseOver(event: any) {
    event.target.style.color = 'red';
  }
  handelMouseOut(event: any) {
    event.target.style.color = 'black';
  }
  handelDeleteExperience(id: number, index: number) {
    this.ProfileService.deleteExperience(id).subscribe({
      next: (res) => {
        console.log(res);
        // this.userData.education.splice(index, 1);
        this.userData = res.data;
        this.ToastrService.success(
          'Experience Deleted Successfully',
          'Success'
        );
      },
      error: (err) => {
        console.log(err);
        this.ToastrService.error(err.error.message, 'Error');
      },
    });
  }
}
