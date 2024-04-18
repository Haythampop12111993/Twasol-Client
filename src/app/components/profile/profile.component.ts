import { GlobalService } from './../../services/global/global.service';
import { DialogOverviewExampleDialogComponent } from './../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { CommonModule } from '@angular/common';
import { ProfileService } from './../../services/profiles/profile.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from '../user-info/user-info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { EducationComponent } from '../education/education.component';
import { ExperienceComponent } from '../experience/experience.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserInfoComponent,
    FontAwesomeModule,
    EducationComponent,
    ExperienceComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  isUserProfile = true;
  isLoading = false;
  userProfile: any = {};
  userSocial: any = {};
  img: any = 'assets/default.png';
  constructor(
    private ProfileService: ProfileService,
    public GlobalService: GlobalService,
    public dialog: MatDialog
  ) {}
  faPlus = faPlus;
  ngOnInit(): void {
    this.ProfileService.userProfile().subscribe({
      next: (res) => {
        this.isUserProfile = true;
        localStorage.setItem('userProfile', 'true');
        console.log(res);
        if (res.data.image) {
          this.img = res.data.image;
          this.GlobalService.userImage = res.data.image;
        }
        this.userProfile = res.data;
        this.userSocial = res.data.social;
        this.ProfileService.userProfile_id = res.data._id;
        localStorage.setItem('userProfile_id', res.data._id);
      },
      error: (err) => {
        this.isUserProfile = false;
        this.GlobalService.userImage = 'assets/default.png';
        console.log(err.message);
        console.log(err.error.message);
        this.isLoading = true;
      },
      complete: () => {
        this.isLoading = true;
      },
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      data: { name: this.userProfile.user.name },
    });
  }
  // dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }
}
