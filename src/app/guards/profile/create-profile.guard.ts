import { CanActivateFn, Router } from '@angular/router';
import { ProfileService } from '../../services/profiles/profile.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const createProfileGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token')) {
    const profileService = inject(ProfileService);
    profileService.userProfile().subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('userProfile', 'true');
        return false;
      },
      (err) => {
        console.log(err);
        localStorage.setItem('userProfile', 'false');
        return true;
      }
    );

    const isProfile = localStorage.getItem('userProfile');
    const router = inject(Router);
    const toastr = inject(ToastrService);
    if (isProfile === 'true') {
      router.navigateByUrl('/main/profile');
      toastr.error('You Are Already Have Profile');
      return false;
    } else {
      return true;
    }
  }
  return true;
};
