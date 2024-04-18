import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { GlobalService } from '../../services/global/global.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(public global: GlobalService) {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   this.global.islogin = true;
    // } else {
    //   this.global.islogin = false;
    // }
  }
  TITLES = [
    'Create your TwaSol profile and connect with other developers',
    'TwaSol is the first website in the Arab World to connect engineers',
    'Build a professional network with other developers',
  ];
  titleIndex = 0;
  fadeIn = true;
  ngOnInit(): void {
    let timeout = null;
    let titleInterval = null;
    titleInterval = setInterval(() => {
      const index = (this.titleIndex + 1) % this.TITLES.length;
      this.titleIndex = index;
      this.fadeIn = true;
      timeout = setTimeout(() => {
        this.fadeIn = false;
      }, 2000);
    }, 4000);

    timeout = setTimeout(() => {
      this.fadeIn = false;
    }, 2000);
  }
}
