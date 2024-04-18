import { ProfileService } from './../../services/profiles/profile.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-add-experience',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.css',
})
export class AddExperienceComponent {
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ToastrService: ToastrService,
    private ProfileService: ProfileService
  ) {}
  experienceFrom: any = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    company: this.fb.control('', [Validators.required]),
    location: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.required]),
    from: this.fb.control('', [Validators.required]),
    current: this.fb.control(false, [Validators.required]),
    to: this.fb.control(''),
  });
  get experienceControls() {
    return this.experienceFrom.controls;
  }
  addExperience() {
    this.isSubmitted = true;
    // if (this.experienceFrom.valid && this.experienceFrom.get('current')?.value) {
    //   console.log(this.experienceFrom.value);
    // }
    if (
      this.experienceFrom.value.current == true &&
      this.experienceFrom.get('to')?.value &&
      this.experienceFrom.valid
    ) {
      console.log(this.experienceFrom.value, 'current and to');
      this.ToastrService.error(
        'You can not add current and To Date at the same time',
        'Error'
      );
    }
    if (
      this.experienceFrom.value.current == false &&
      this.experienceFrom.get('to')?.value &&
      this.experienceFrom.valid
    ) {
      console.log(this.experienceFrom.value, 'not current');
      this.ProfileService.addExperience(this.experienceFrom.value).subscribe({
        next: (res) => {
          console.log(res);
          this.ToastrService.success(
            'Experience Added Successfully',
            'Success'
          );
          this.router.navigate(['main', 'profile']);
        },
        error: (err) => {
          console.log(err);
          this.ToastrService.error(err.error.message, 'Error');
        },
      });
    }
    if (
      this.experienceFrom.value.current == true &&
      !this.experienceFrom.get('to')?.value &&
      this.experienceFrom.valid
    ) {
      console.log(this.experienceFrom.value, 'current');
      this.ProfileService.addExperience(this.experienceFrom.value).subscribe({
        next: (res) => {
          console.log(res);
          this.ToastrService.success(
            'Experience Added Successfully',
            'Success'
          );
          this.router.navigate(['main', 'profile']);
        },
        error: (err) => {
          console.log(err);
          this.ToastrService.error(err.error.message, 'Error');
        },
      });
    }
  }
}
