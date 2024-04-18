import { GlobalService } from './../../services/global/global.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './../../services/profiles/profile.service';
import { Component } from '@angular/core';
import { UserInfoComponent } from '../user-info/user-info.component';
import { EducationComponent } from '../education/education.component';
import { ExperienceComponent } from '../experience/experience.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserInfoComponent, EducationComponent, ExperienceComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  profileId = '';
  unHashProfileId = '';
  isLoading = false;
  userProfile: any = {};
  img = 'assets/default.png';
  constructor(
    private ProfileService: ProfileService,
    private route: ActivatedRoute,
    private Router: Router,
    private ToastrService: ToastrService,
    private GlobalService: GlobalService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.profileId = params['profileId'];
      console.log(this.profileId);
      this.ProfileService.showUserProfile(this.profileId).subscribe({
        next: (res) => {
          console.log(res);
          this.userProfile = res.data;
          this.img = this.userProfile.image;
        },
        error: (err) => {
          console.log(err);
          this.ToastrService.error(err.error.message, 'Error');
          this.Router.navigate(['main', 'usersProfiles']);
        },
        complete: () => {
          this.isLoading = true;
        },
      });
    });
  }
}
