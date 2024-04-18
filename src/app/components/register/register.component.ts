import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Register } from '../../interfaces/register';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isSubmitted = false;
  isError = false;
  errorMassage = '';
  constructor(
    private UserService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });
  get formControls() {
    return this.registerForm.controls;
  }
  handelRegister() {
    this.isSubmitted = true;
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.password ==
          this.registerForm.value.confirmPassword &&
        this.registerForm.errors == null
      ) {
        const newFormData: Register = {
          name: this.registerForm.value.name,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          phone: this.registerForm.value.phone,
          gender: this.registerForm.value.gender?.toLowerCase(),
        } as Register;
        console.log(newFormData);
        this.UserService.register(newFormData).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Register Successfully', 'Success');
            this.registerForm.reset();
            this.isSubmitted = false;
            this.isError = false;
            this.router.navigate(['/login']);
          },
          error: (e) => {
            console.log('error');
            console.log(e.error.message);
            this.isError = true;
            this.errorMassage = e.error.message;
            this.toastr.error(e.error.message, 'Error');
          },
          complete: () => {},
        });
      }
    }
  }
}
