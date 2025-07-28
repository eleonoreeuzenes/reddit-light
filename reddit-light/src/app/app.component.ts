import { Component, OnInit } from '@angular/core';
import { RedditService } from './reddit.service';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [NgFor, CommonModule, FormsModule],
})

export class AppComponent implements OnInit {
  subreddits: string[] = ['formula1', 'straykids', 'YukiTsunoda', 'RedBullRacing', 'OscarPiastri', 'FormulaDank', 'DragRaceFrance'];
  selectedSubreddit: string = 'formula1'; // default

  posts: any[] = [];
  selectedPost: any = null;
  comments: any[] = [];
  loading: boolean = true;
  loadingComments: boolean = false;
  showComments: boolean = false;

  constructor(private redditService: RedditService) {}

  ngOnInit(): void {
    this.fetchPosts(); // fetch initial subreddit (formula1)
  }

  fetchPosts(): void {
    this.loading = true;
    this.selectedPost = null; // clear previous post if any
    this.redditService.getTopPosts(this.selectedSubreddit).subscribe(response => {
      this.posts = response.data.children;
      this.loading = false;
    });
  }

  getImageUrl(post: any): string | null {
    if (post.data.preview?.images?.length) {
      return post.data.preview.images[0].source.url.replace(/&amp;/g, '&');
    }
    if (post.data.thumbnail?.startsWith('http')) {
      return post.data.thumbnail;
    }
    return null;
  }

  onSelectPost(post: any): void {
    this.selectedPost = post;
    this.loadingComments = true;
    this.showComments = false;

    this.redditService.getComments(this.selectedSubreddit, post.data.id).subscribe(response => {
      this.comments = response[1].data.children.slice(0, 5);
      this.loadingComments = false;
      setTimeout(() => {
        this.showComments = true;
      }, 10);
    });
  }

  backToList(): void {
    this.selectedPost = null;
    this.comments = [];
  }
}
