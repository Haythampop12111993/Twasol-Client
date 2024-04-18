import { GlobalService } from './../../services/global/global.service';
import { ProfileService } from './../../services/profiles/profile.service';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from './../../services/posts/posts.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  post = '';
  isUserProfile = false;
  @Output() isPostAdded = new EventEmitter<void>();
  constructor(
    private PostsService: PostsService,
    private ProfileService: ProfileService,
    private ToastrService: ToastrService,
    private router: Router,
    private GlobalService: GlobalService
  ) {}
  addNewItem() {
    this.isPostAdded.emit();
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log(this.post);
      if (this.GlobalService.isUserHaveProfile) {
        this.PostsService.createPost({ text: this.post }).subscribe({
          next: (res) => {
            console.log(res);
            this.addNewItem();
            // this.GlobalService.allPosts.unshift(res.data);
            this.ToastrService.success('Post Created Successfully');
            form.resetForm();
          },
          error: (err) => {
            console.log(err);
            this.ToastrService.error('Something went wrong');
          },
        });
      } else {
        this.ToastrService.error('Please create profile first');
        this.router.navigate(['main', 'profile']);
      }
    }
  }
}
