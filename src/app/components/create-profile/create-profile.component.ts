import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../services/profiles/profile.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css',
})
export class CreateProfileComponent {
  isSubmit = false;
  userSkills: string[] = [];
  isImtySkill: boolean = false;
  isWithComa = false;
  isSkillsFocus = false;
  showMedia: boolean = false;
  img: any = '';
  formData = new FormGroup({
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
    return this.formData.controls;
  }
  constructor(
    private ProfileService: ProfileService,
    private ToastrService: ToastrService,
    private router: Router
  ) {}
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.img = target.files[0];
      const uplodeData = new FormData();
      uplodeData.append('image', this.img, this.img.name);
      console.log(uplodeData);
      this.ProfileService.uplodeProfileImage(this.img).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  hundelFocus() {
    this.isSkillsFocus = true;
  }
  hundelSubmit(skills: string) {
    // const profileData = {
    //   status: this.formData.value.status,
    //   company: this.formData.value.company,
    //   website: this.formData.value.website,
    //   location: this.formData.value.location,
    //   country: this.formData.value.country,
    // };
    // const newFormData = new FormData();
    // newFormData.append('status', profileData.status as string);
    // newFormData.append('company', this.formData.value.company as string);
    // newFormData.append('website', this.formData.value.website as string);
    // newFormData.append('location', this.formData.value.location as string);
    // newFormData.append('country', this.formData.value.country as string);
    // if (this.img) {
    //   newFormData.append('image', this.img);
    // }
    // console.log(this.formData.value);
    if (this.formData.valid) {
      if (skills == '') {
        this.isImtySkill = true;
      } else {
        this.isImtySkill = false;
        this.isSubmit = true;
        if (skills.includes(',')) {
          this.isWithComa = true;
          const skillsArray: any[] = skills.split(',').map((item) => {
            return item.trim().toLowerCase();
          });
          const newSkillsArray = [...new Set(skillsArray)];
          newSkillsArray.forEach((skill) => {
            if (skill != '') {
              if (!this.formData.value.skills?.includes(skill)) {
                this.formData.controls.skills.push(new FormControl(skill));
              }
            }
          });
          this.formData.value.skills = this.formData.value.skills?.filter(
            (skill) => {
              return skill != '';
            }
          );
          console.log(this.formData.value);
          this.ProfileService.addUserProfile(this.formData.value).subscribe({
            next: (res) => {
              console.log(res);
              this.ToastrService.success('Profile Created Successfully');
              this.router.navigate(['/main/profile']);
            },
            error: (err) => {
              console.log(err);
              if (
                err.error.message ==
                "You already have a profile you can't create another one"
              ) {
                this.router.navigate(['/main/profile']);
              }
              this.ToastrService.error(
                'Something went wrong',
                err.error.message
              );
            },
            complete: () => {},
          });
        } else {
          this.isWithComa = false;
        }
      }
    }

    // const skillsItemsArry = this.formData.value.skills?.filter((skill) => {
    //   return skill != '';
    // });
    // console.log(skillsItemsArry);
  }
  // addSkill(skill: string) {
  //   // this.skillCounter++;
  //   // this.skills.push(this.skill);
  //   if (skill === '') {
  //     this.isImtySkill = true;
  //   } else {
  //     this.isImtySkill = false;
  //     const skillInLowerCase = skill.toLowerCase();
  //     this.userSkills.push(skillInLowerCase);
  //     console.log(this.userSkills);
  //     this.formData.controls['skills'].setValue('');
  //   }
  // }
  // editSkills(newSkills: string) {
  //   this.formData.controls['skills'].setValue(this.userSkills.join(','));
  //   this.isImtySkill = false;
  //   this.userSkills = [];
  //   newSkills.split(',').forEach((skill) => {
  //     // this.userSkills.push(skill);
  //     if (skill) {
  //       this.userSkills.push(skill);
  //     }
  //   });
  //   console.log(this.userSkills);
  // }
  // addSkills(skills: string) {
  //   const skillsArray = skills.split(',');
  //   skillsArray.forEach((skill) => {
  //     this.formData.controls.skills.push(new FormControl(skill));
  //   });
  // }
}
