import { GlobalService } from './../../services/global/global.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private UserService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private GlobalService: GlobalService
  ) {}
  formData = {
    email: '',
    password: '',
  };
  handelLogin(loginForm: any) {
    if (loginForm.valid) {
      this.UserService.login(this.formData).subscribe({
        next: (res: any) => {
          console.log(res.data.token);
          localStorage.setItem('token', res.data.token);
          this.UserService.userId = res.data.user._id;
          localStorage.setItem(
            'hashID',
            this.GlobalService.encrypt(res.data.user._id)
          );
          localStorage.setItem(
            'userName',
            this.GlobalService.encrypt(res.data.user.name)
          );
          this.GlobalService.userName = res.data.user.name;
          this.toastr.success('Login Successfully', 'Success');
          this.router.navigate(['main']);
        },
        error: (err) => {
          // @ts-ignore
          console.log(err.error.message);
          this.toastr.error('Invalid Email or Password', 'Error');
        },
        complete: () => {},
      });
    }
  }
}
