import { ToastrService } from 'ngx-toastr';
import { PostsService } from './../../services/posts/posts.service';
import { UserService } from './../../services/user/user.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { GlobalService } from '../../services/global/global.service';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css',
})
export class PostItemComponent {
  @Input() post: any = {};
  @Output() likePost = new EventEmitter<any>();
  @Output() unLikePost = new EventEmitter<any>();

  img = 'assets/default.png';
  userId = '';
  inMain = false;
  LikeColor = 'black';
  unLikeColor = 'black';
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faTrash = faTrash;
  likes = [];
  unLikes = [];

  constructor(
    private UserService: UserService,
    private PostsService: PostsService,
    private ToastrService: ToastrService,
    public global: GlobalService
  ) {
    if (window.location.pathname == '/main') {
      this.inMain = true;
    } else {
      this.inMain = false;
    }
  }
  ngOnInit(): void {
    this.LikeColor = 'rgba(0, 0, 0, 0.8)';
    this.unLikeColor = 'rgba(0, 0, 0, 0.8)';
    // this.likes = this.post.likes;
    // this.unLikes = this.post.unLikes;
    console.log(this.post);
    this.UserService.getUserData().subscribe({
      next: (res) => {
        this.userId = res.data._id;
        console.log(this.userId);
        if (this.post.likes) {
          this.post.likes.forEach((element: any) => {
            if (element.user == this.userId) {
              // this.LikeColor = 'blue';
              console.log(this.LikeColor);
            }
          });
        } else {
          // this.LikeColor = 'rgba(0, 0, 0, 0.8)';
          console.log(this.LikeColor, 'else');
        }
        if (this.post.unLikes) {
          this.post.unLikes.forEach((element: any) => {
            if (element.user == this.userId) {
              // this.unLikeColor = 'blue';
              console.log(this.unLikeColor);
            }
          });
        } else {
          // this.unLikeColor = 'rgba(0, 0, 0, 0.8)';
          console.log(this.unLikeColor, 'else');
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
        // this.LikeColor = 'black';
        // this.unLikeColor = 'black';
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      this.post = changes['post'].currentValue;
      console.log('posts changed');
    }
  }
  handelDeletePost(id: string) {
    this.PostsService.deletePost(id).subscribe({
      next: (res) => {
        console.log(res);
        this.global.allPosts = this.global.allPosts.filter(
          (item: any) => item._id !== res.data._id
        );
        this.ToastrService.success('Post Deleted Successfully');
      },
      error: (err) => {
        console.log(err);
        this.ToastrService.error('Something went wrong');
      },
    });
  }
  handelLikePost(postId: string) {
    this.PostsService.likes(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.ToastrService.success('Post Liked Successfully');
        // this.likes = res.data.likes;
        // this.unLikes = res.data.unLikes;
        // this.LikeColor = 'blue';
        // this.unLikeColor = 'rgba(0, 0, 0, 0.8)';
        this.likePost.emit();
      },
      error: (err) => {
        console.log(err);
        this.ToastrService.error(err.error.message);
      },
    });
  }
  handelUnLikePost(postId: string) {
    this.PostsService.unLikes(postId).subscribe({
      next: (res) => {
        console.log(res);
        // this.unLikeColor = 'blue';
        // this.LikeColor = 'rgba(0, 0, 0, 0.8)';
        this.ToastrService.info('Post UnLiked Successfully');
        // this.unLikes = res.data.unLikes;
        // this.likes = res.data.likes;
        this.unLikePost.emit();
      },
      error: (err) => {
        console.log(err);
        this.ToastrService.error(err.error.message);
      },
    });
  }
}
