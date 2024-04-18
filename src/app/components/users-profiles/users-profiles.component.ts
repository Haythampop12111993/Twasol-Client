import { GlobalService } from './../../services/global/global.service';
import { UserService } from './../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { ProfileService } from './../../services/profiles/profile.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-profiles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-profiles.component.html',
  styleUrl: './users-profiles.component.css',
})
export class UsersProfilesComponent {
  allUsersProfiles: any[] = [];
  isLoading = false;
  img: string = 'assets/default.png';
  constructor(
    private ProfileService: ProfileService,
    private GlobalService: GlobalService
  ) {}
  ngOnInit(): void {
    this.ProfileService.allUsersProfiles().subscribe({
      next: (res) => {
        console.log(res);
        this.allUsersProfiles = res.data;
        if (localStorage.getItem('hashID')) {
          const userId = this.GlobalService.decrypt(
            localStorage.getItem('hashID') || ''
          );
          this.allUsersProfiles = res.data.filter((profile: any) => {
            return profile.user._id !== userId;
          });
        }

        console.log(this.allUsersProfiles);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading = true;
      },
    });
  }
}
