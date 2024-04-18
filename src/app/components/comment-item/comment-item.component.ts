import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './../../services/global/global.service';
import { PostsService } from './../../services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.css',
})
export class CommentItemComponent {
  @Input() comment: any = {};
  @Input() post_id: string = '';
  @Input() userId: string = '';
  img = 'assets/default.png';
  faTrash = faTrash;
  constructor(
    private PostsService: PostsService,
    private GlobalService: GlobalService,
    private ToastrService: ToastrService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post_id']) {
      this.post_id = changes['post_id'].currentValue;
    }
    if (changes['userId']) {
      this.userId = changes['userId'].currentValue;
    }
  }
  deleteComment(commentId: string) {
    this.PostsService.deleteComments(this.post_id, commentId).subscribe({
      next: (res) => {
        console.log(res);
        this.GlobalService.postData = res.data;
        this.ToastrService.success('Comment Deleted Successfully', 'Success');
      },
      error: (err) => {
        console.log(err);
        this.ToastrService.error('Something went wrong', 'Error');
      },
    });
  }
}
