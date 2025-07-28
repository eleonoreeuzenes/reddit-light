import { Component, OnInit } from '@angular/core';
import { RedditService } from './reddit.service';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [NgFor, CommonModule],
})
export class AppComponent implements OnInit {
  posts: any[] = [];
  selectedPost: any = null;
  comments: any[] = [];
  loading: boolean = true;           // loading posts
  loadingComments: boolean = false;  // loading comments

  constructor(private redditService: RedditService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.loading = true;
    this.redditService.getTopPosts().subscribe(response => {
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
    this.redditService.getComments(post.data.id).subscribe(response => {
      this.comments = response[1].data.children.slice(0, 5);
      this.loadingComments = false;
    });
  }

  backToList(): void {
    this.selectedPost = null;
    this.comments = [];
  }
}
