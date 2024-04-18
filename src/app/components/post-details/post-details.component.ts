import { UserService } from './../../services/user/user.service';
import { GlobalService } from './../../services/global/global.service';
import { PostsService } from './../../services/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Component, SimpleChanges } from '@angular/core';
import { PostItemComponent } from '../post-item/post-item.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostItemComponent, PostCommentComponent, CommentItemComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {
  userId = '';
  postId = '';
  isLoading = false;
  postData: any = {};
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private PostsService: PostsService,
    public GlobalService: GlobalService,
    private UserService: UserService
  ) {
    ActivatedRoute.params.subscribe((params) => {
      this.postId = params['postId'];
      console.log(this.postId);
    });
  }
  ngOnInit(): void {
    this.PostsService.singlePost(this.postId).subscribe({
      next: (res) => {
        console.log(res);
        this.postData = res.data;
        this.GlobalService.postData = res.data;
        console.log(this.postData);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading = true;
      },
    });
    this.UserService.getUserData().subscribe({
      next: (res) => {
        console.log(res);
        this.userId = res.data._id;
        console.log(this.userId);
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId']) {
      this.postId = changes['postId'].currentValue;
      this.ngOnInit();
    }
  }
}
