import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProfileService } from './../../services/profiles/profile.service';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  isLoading = false;
  showMedia = false;
  isSubmit = false;
  isWithComa = false;
  isSkillsFocus = false;
  isImtySkill: boolean = false;
  oldUserSkills = '';
  constructor(
    private ProfileService: ProfileService,
    private router: Router,
    private ToastrService: ToastrService
  ) {}
  editForm = new FormGroup({
    status: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    website: new FormControl(''),
    location: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    skills: new FormArray([new FormControl('')], []),
    bio: new FormControl('', [Validators.required]),
    social: new FormGroup({
      facebook: new FormControl(''),
      twitter: new FormControl(''),
      linkedin: new FormControl(''),
      youtube: new FormControl(''),
      instagram: new FormControl(''),
      github: new FormControl(''),
    }),
  });
  get formControls() {
    return this.editForm.controls;
  }
  ngOnInit(): void {
    this.ProfileService.userProfile().subscribe({
      next: (res) => {
        console.log(res);
        this.editForm.patchValue(res.data);
        // this.editForm.controls.skills.valid = res.data.skills.join(",")
        // this.editForm.value.skills = ['hello'];
        this.oldUserSkills = res.data.skills.join();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = true;
      },
      complete: () => {
        this.isLoading = true;
      },
    });
  }
  hundelFocus() {
    this.isSkillsFocus = true;
  }
  handelSubmit(skills: string) {
    if (this.editForm.valid) {
      if (skills == '') {
        this.isImtySkill = true;
      } else {
        this.isImtySkill = false;
        this.isSubmit = true;
        if (skills.includes(',')) {
          this.isWithComa = true;
          const skillsArray: any[] = skills
            .split(',')
            .map((item) => item.trim().toLowerCase());
          console.log(skillsArray);
          // const newSkillsArray = [...new Set(skillsArray)];
          const newSkillsArray = skillsArray.filter(
            (skill, index) => skillsArray.indexOf(skill) === index
          );
          console.log(newSkillsArray);
          newSkillsArray.forEach((skill) => {
            if (skill.trim().toLowerCase() != '') {
              if (!this.editForm.value.skills?.includes(skill)) {
                this.editForm.controls.skills.push(
                  new FormControl(skill.trim())
                );
              }
            }
          });
          this.editForm.value.skills = this.editForm.value.skills?.filter(
            (skill) => {
              return skill != '';
            }
          );
          // console.log(this.editForm.value);
          // this.editForm.value.skills = this.editForm.value.skills?.filter(
          //   (skill: any, index) => {
          //     return this.editForm.value.skills?.findIndex(skill) == index;
          //   }
          // );

          console.log(this.editForm.value);
          this.ProfileService.editProfile(this.editForm.value).subscribe({
            next: (res) => {
              console.log(res);
              this.ToastrService.success(
                'Profile Updated Successfully',
                'Success'
              );
              this.router.navigate(['main', 'profile']);
            },
            error: (err) => {
              console.log(err);
              this.ToastrService.error('Something went wrong', 'Error');
            },
            complete: () => {},
          });
        } else {
          this.isWithComa = false;
        }
      }
    }
  }
}
