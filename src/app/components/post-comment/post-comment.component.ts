import { GlobalService } from './../../services/global/global.service';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from './../../services/posts/posts.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.css',
})
export class PostCommentComponent {
  @Input() post_id: string = '';
  @Output() commentAdded = new EventEmitter<any>();
  comment = '';
  constructor(
    private PostsService: PostsService,
    private ToastrService: ToastrService,
    private GlobalService: GlobalService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post_id']) {
      this.post_id = changes['post_id'].currentValue;
      console.log(this.post_id);
    }
  }
  onSubmit(comment: any) {
    if (comment.valid) {
      console.log(comment.value);
      console.log(this.post_id);
      this.PostsService.addComments(comment.value, this.post_id).subscribe(
        (res) => {
          console.log(res);
          this.ToastrService.success('Comment Added Successfully', 'Success');
          this.commentAdded.emit(res.data);
          // Reset the form to clear out all
          comment.reset();
          comment.submitted = false;
          this.GlobalService.postData = res.data;
        },
        (err) => {
          console.log(err);
          this.ToastrService.error(
            err.error.message || 'Error',
            'Please Add Profile '
          );
        }
      );
    }
  }
}
