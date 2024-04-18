import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './../../services/profiles/profile.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  faTrash = faTrash;
  color = 'black';
  faGraduationCap = faGraduationCap;
  inProfile = false;
  item = {
    current: true,
    degree: 'Good',
    fieldOfStudy: 'Web Development',
    school: 'Imbaba',
    from: '01/01/2023',
    to: 'now',
  };
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
  handelDeleteEducation(id: number, index: number) {
    // console.log(id, index);
    this.ProfileService.deleteEducation(id).subscribe({
      next: (res) => {
        console.log(res);
        // this.userData.education.splice(index, 1);
        this.userData = res.data;
        this.ToastrService.success('Education Deleted Successfully', 'Success');
      },
      error: (err) => {
        console.log(err);
        this.ToastrService.error(err.error.message, 'Error');
      },
      complete: () => {},
    });
  }
  handelMouseOver(event: any) {
    event.target.style.color = 'red';
  }
  handelMouseOut(event: any) {
    event.target.style.color = 'black';
  }
}
