import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './../../services/profiles/profile.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GlobalService } from '../../services/global/global.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog-overview-example-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatProgressSpinnerModule,
  ],
  templateUrl: './delete-dialog-overview-example-dialog.component.html',
  styleUrl: './delete-dialog-overview-example-dialog.component.css',
})
export class DeleteDialogOverviewExampleDialogComponent {
  isLoading = false;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogOverviewExampleDialogComponent>,
    private ProfileService: ProfileService,
    private ToastrService: ToastrService,
    private GlobalService: GlobalService,
    private router: Router
  ) {}
  deleteProfile() {
    this.ProfileService.deleteUserProfile().subscribe({
      next: (res) => {
        console.log(res);
        this.ToastrService.success('Profile Deleted');
        // this.isUserProfile = false;
        localStorage.removeItem('userProfile');
        this.GlobalService.userImage = 'assets/default.png';
        this.router.navigate(['main', 'profile']);
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = true;
        this.ToastrService.error(err.error.message);
      },
      complete: () => {
        this.isLoading = true;
      },
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
