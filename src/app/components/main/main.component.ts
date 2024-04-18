import { ProfileService } from './../../services/profiles/profile.service';
import { UserService } from './../../services/user/user.service';
import { PostsService } from './../../services/posts/posts.service';
import { Component } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { RouterOutlet } from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, PostFormComponent, PostItemComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  isLoading = false;
  allPosts = [];
  userData = {};
  constructor(
    public global: GlobalService,
    private PostsService: PostsService,
    private UserService: UserService,
    private ProfileService: ProfileService
  ) {
    const token = localStorage.getItem('token');
    if (!token) {
      global.islogin = false;
    }
    global.islogin = true;
  }
  ngOnInit(): void {
    this.PostsService.getAllUsersPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.allPosts = res.data;
        this.global.allPosts = res.data;
        console.log(this.allPosts);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading = true;
      },
    });
    this.ProfileService.userProfile().subscribe({
      next: (res) => {
        this.global.isUserHaveProfile = true;
      },
      error: (err) => {
        this.global.isUserHaveProfile = false;
        console.log(err);
      },
    });
  }
  addNewItem() {
    this.ngOnInit();
  }
  handelLikePost(event: any) {
    this.ngOnInit();
    console.log(event);
  }
  handelUnLikePost(event: any) {
    this.ngOnInit();
    console.log(event);
  }
}
