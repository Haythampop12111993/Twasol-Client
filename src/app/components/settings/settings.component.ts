import { GlobalService } from './../../services/global/global.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './../../services/profiles/profile.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteDialogOverviewExampleDialogComponent } from '../delete-dialog-overview-example-dialog/delete-dialog-overview-example-dialog.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  isLoading = false;
  isUserProfile = false;
  constructor(
    private ProfileService: ProfileService,
    private router: Router,
    private ToastrService: ToastrService,
    private GlobalService: GlobalService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.ProfileService.userProfile().subscribe({
      next: (res) => {
        console.log(res);
        this.isUserProfile = true;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = true;
        this.isUserProfile = false;
      },
      complete: () => {
        this.isLoading = true;
      },
    });
  }
  // handelDeleteProfile() {
  //   this.ProfileService.deleteUserProfile().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       // this.isUserProfile = false;
  //       this.ToastrService.success('Profile Deleted');
  //       localStorage.removeItem('userProfile');
  //       this.GlobalService.userImage = '';
  //       this.router.navigate(['main', 'profile']);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.ToastrService.error('Something went wrong');
  //     },
  //   });
  // }
  openDialog(): void {
    const dialogRef = this.dialog.open(
      DeleteDialogOverviewExampleDialogComponent,
      {}
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
