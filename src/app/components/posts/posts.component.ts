import { RouterModule } from '@angular/router';
import { PostsService } from './../../services/posts/posts.service';
import { PostItemComponent } from './../post-item/post-item.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostItemComponent, RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  isLoading = false;
  isUserHavePosts = false;
  posts = [];
  constructor(private PostsService: PostsService) {}
  ngOnInit(): void {
    this.PostsService.userPosts().subscribe({
      next: (res) => {
        console.log(res);
        if (res.data.length > 0) {
          this.isUserHavePosts = true;
          this.posts = res.data;
        }
      },
      error: (err) => {
        console.log(err);
        this.isUserHavePosts = false;
        this.isLoading = true;
      },
      complete: () => {
        this.isLoading = true;
      },
    });
  }
}
