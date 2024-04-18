import { ProfileService } from './../../services/profiles/profile.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-education',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.css',
})
export class AddEducationComponent {
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ToastrService: ToastrService,
    private ProfileService: ProfileService
  ) {}
  educationFrom: any = this.fb.group({
    school: this.fb.control('', [Validators.required]),
    degree: this.fb.control('', [Validators.required]),
    fieldOfStudy: this.fb.control('', [Validators.required]),
    from: this.fb.control('', [Validators.required]),
    current: this.fb.control(false, [Validators.required]),
    to: this.fb.control(''),
  });
  get educationControls() {
    return this.educationFrom.controls;
  }
  addEducation() {
    this.isSubmitted = true;
    // if (this.educationFrom.valid && this.educationFrom.get('current')?.value) {
    //   console.log(this.educationFrom.value);
    // }
    if (
      this.educationFrom.value.current == true &&
      this.educationFrom.get('to')?.value &&
      this.educationFrom.valid
    ) {
      console.log(this.educationFrom.value, 'current and to');
      this.ToastrService.error(
        'You can not add current and To Date at the same time',
        'Error'
      );
    }
    if (
      this.educationFrom.value.current == false &&
      this.educationFrom.get('to')?.value &&
      this.educationFrom.valid
    ) {
      console.log(this.educationFrom.value, 'not current');
      this.ProfileService.addEducation(this.educationFrom.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['main', 'profile']);
          this.ToastrService.success('Education Added Successfully', 'Success');
        },
        error: (err) => {
          console.log(err);
          this.ToastrService.error(err.error.message, 'Error');
        },
        complete: () => {},
      });
    }
    if (
      this.educationFrom.value.current == true &&
      !this.educationFrom.get('to')?.value &&
      this.educationFrom.valid
    ) {
      console.log(this.educationFrom.value, 'current');
      this.ProfileService.addEducation(this.educationFrom.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['main', 'profile']);
          this.ToastrService.success('Education Added Successfully', 'Success');
        },
        error: (err) => {
          console.log(err);
          this.ToastrService.error(err.error.message, 'Error');
        },
        complete: () => {},
      });
    }
  }
}
