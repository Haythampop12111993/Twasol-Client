import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostsComponent } from './components/posts/posts.component';
import { mianGuard } from './guards/main/mian.guard';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { createProfileGuard } from './guards/profile/create-profile.guard';
import { AddEducationComponent } from './components/add-education/add-education.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { UsersProfilesComponent } from './components/users-profiles/users-profiles.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home',
    canActivate: [mianGuard],
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  {
    path: 'main',
    children: [
      { path: '', component: MainComponent, title: 'Main' },
      {
        path: 'profile',
        children: [
          { path: '', component: ProfileComponent, title: 'Profile' },
          {
            path: 'createProfile',
            component: CreateProfileComponent,
            title: 'createProfile',
            canActivate: [createProfileGuard],
          },
          {
            path: 'education/addEducation',
            component: AddEducationComponent,
            title: 'Add Education',
          },
          {
            path: 'experience/addExperience',
            component: AddExperienceComponent,
            title: 'Add Experience',
          },
          {
            path: 'editProfile',
            component: EditProfileComponent,
            title: 'Edit Profile',
          },
        ],
      },
      { path: 'userPosts', component: PostsComponent, title: 'Posts' },
      {
        path: 'postDetails/:postId',
        component: PostDetailsComponent,
        title: 'Post Details',
      },
      {
        path: 'usersProfiles',
        children: [
          {
            path: '',
            component: UsersProfilesComponent,
            title: 'Users Profiles',
          },
          {
            path: 'userProfile/:profileId',
            component: UserProfileComponent,
            title: 'User Profile',
          },
        ],
      },
      { path: 'settings', component: SettingsComponent, title: 'Settings' },
    ],
  },
  {
    path: '**',
    // redirectTo: 'home',
    // pathMatch: 'full',
    component: ErrorComponent,
    title: 'Error',
  },
];
