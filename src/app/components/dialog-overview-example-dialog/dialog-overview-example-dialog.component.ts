import { GlobalService } from './../../services/global/global.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from './../../services/profiles/profile.service';
import { Component, Inject } from '@angular/core';
import {
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-overview-example-dialog',
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
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrl: './dialog-overview-example-dialog.component.css',
})
export class DialogOverviewExampleDialogComponent {
  upLoadImg = '';
  isUpLoading = false;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    private ProfileService: ProfileService,
    private GlobalService: GlobalService,
    private ToastrService: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmitClick() {
    if (this.upLoadImg) {
      this.isUpLoading = true;
      const formData = new FormData();
      formData.append('image', this.upLoadImg);
      // this.dialogRef.close(formData);
      console.log(formData);
      if (this.upLoadImg) {
        this.ProfileService.uploadImage(formData).subscribe({
          next: (res) => {
            console.log(res);
            this.isUpLoading = false;
            this.GlobalService.userImage = res.data.image;
            this.dialogRef.close();
            this.ToastrService.success('Profile Image uploaded successfully');
            this.router.navigate(['main', 'profile']);
          },
          error: (err) => {
            console.log(err);
            this.isUpLoading = false;
            this.ToastrService.error('Something went wrong');
            this.router.navigate(['main', 'profile']);
            this.dialogRef.close();
          },
        });
      }
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.upLoadImg = file;
    console.log(this.upLoadImg);

    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   this.data.name = reader.result as string;
    // };
  }
}
