import { ProfileService } from './../../../services/profiles/profile.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../services/user/user.service';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GlobalService } from '../../../services/global/global.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSmileWink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  name = '';
  faSmileWink = faSmileWink;
  constructor(
    private UserService: UserService,
    public global: GlobalService,
    private ProfileService: ProfileService,
    private router: Router,
    private ToastrService: ToastrService
  ) {
    if (localStorage.getItem('token')) {
      this.global.islogin = true;
      // if (localStorage.getItem('userName')) {
      //   // this.name = this.global.decrypt(localStorage.getItem('userName') || '');
      //   this.global.userName = this.name;
      // }
      this.UserService.getUserData().subscribe({
        next: (res) => {
          this.name = res.data.name;
          this.global.userName = this.name;
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.ProfileService.userProfile().subscribe({
        next: (res) => {
          if (res.data.image) {
            this.global.userImage = res.data.image;
          }
        },
      });
    }
  }
  logout() {
    this.UserService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userProfile_id');
        localStorage.removeItem('hashID');
        localStorage.removeItem('userName');
        this.name = '';
        this.global.islogin = false;
        this.global.userName = '';
        this.global.userImage = 'assets/default.png';
        this.ToastrService.success('Logout Successfully', 'Success');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.ToastrService.error(err.error.message, 'Error');
      },
    });
  }
}
// token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRlZTEyODhiYmQ2NmM0MzQ2NTI1MmEiLCJpYXQiOjE3MDkyMTkwMjEsImV4cCI6MTcwOTMwNTQyMX0.bXW34HGPsUl0wfGonJXfgLA4LfFB-9va0MqgWAEMGTc
